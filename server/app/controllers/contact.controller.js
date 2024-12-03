const db = require('../models')
const Contact = db.contact
const FirstName = db.firstName
const LastName = db.lastName
const MiddleName = db.middleName
const Street = db.street

const Op = db.Sequelize.Op

const { faker } = require('@faker-js/faker')

function count(request) {
	return Contact.count({
		include: [
			{
				model: FirstName,
				as: 'firstName',
			},
			{
				model: LastName,
				as: 'lastName',
			},
		],
		order: [
			[{ model: FirstName }, 'firstName', 'ASC'],
			[{ model: LastName }, 'lastName', 'ASC'],
		],
		where: request && {
			[Op.or]: [
				{ '$firstName.firstName$': { [Op.like]: `%${request}%` } },
				{ '$lastName.lastName$': { [Op.like]: `%${request}%` } },
			],
		},
	}).then(data => {
		return data
	})
}

exports.findAll = async (req, res) => {
	const limit = req.query.limit || 0
	const page = req.query.page || 1
	const offset = (page - 1) * limit
	const request = req.query.request || ''
	const countNumber = await count(request)

	Contact.findAll({
		include: [
			{
				model: FirstName,
				as: 'firstName',
			},
			{
				model: LastName,
				as: 'lastName',
			},
		],
		order: [
			[{ model: FirstName }, 'firstName', 'ASC'],
			[{ model: LastName }, 'lastName', 'ASC'],
		],
		offset: offset,
		limit: limit || null,
		where: request && {
			[Op.or]: [
				{ '$firstName.firstName$': { [Op.like]: `%${request}%` } },
				{ '$lastName.lastName$': { [Op.like]: `%${request}%` } },
			],
		},
	})
		.then(data => {
			const modifiedData = data.map(contact => {
				return {
					id: contact.id,
					firstName: contact.firstName.firstName,
					lastName: contact.lastName.lastName,
				}
			})
			res.send({
				count: countNumber,
				data: modifiedData,
			})
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || 'Some error occurred while retrieving contacts.',
			})
		})
}

exports.findById = (req, res) => {
	const id = req.params.id
	Contact.findOne({
		where: { id: id },
		include: [
			{
				model: FirstName,
				as: 'firstName',
			},
			{
				model: LastName,
				as: 'lastName',
			},
			{
				model: MiddleName,
				as: 'middleName',
			},
			{
				model: Street,
				as: 'street',
			},
		],
	})
		.then(data => {
			const modifiedData = {
				id: data.id,
				firstName: data.firstName.firstName,
				lastName: data.lastName.lastName,
				middleName: data.middleName.middleName,
				street: data.street.street,
				house: data.house,
				corpus: data.corpus,
				flat: data.flat,
				phone: data.phone,
			}
			res.send(modifiedData)
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || 'Some error occurred while retrieving contacts.',
			})
		})
}

function getRandomInt(min, max) {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min + 1)) + min
}

exports.generateByCount = async (req, res) => {
	const count = req.params.count
	const contacts = []
	const firstNameCount = await FirstName.count()
	const lastNameCount = await LastName.count()
	const middleNameCount = await MiddleName.count()
	const streetCount = await Street.count()

	for (let i = 0; i < count; i++) {
		if (
			firstNameCount == 0 ||
			lastNameCount == 0 ||
			middleNameCount == 0 ||
			streetCount == 0
		) {
			return res.send(
				`<p>Error creating data: firstNameCount, lastNameCount, middleNameCount, streetCount not found</p>
				<a href="http://localhost:8080/api/firstNames/generateByCount/10" target="_blank">generate firstNames</a>
				<a href="http://localhost:8080/api/lastNames/generateByCount/10" target="_blank">generate lastNames</a>
				<a href="http://localhost:8080/api/middleNames/generateByCount/10" target="_blank">generate middleNames</a>
				<a href="http://localhost:8080/api/streets/generateByCount/10" target="_blank">generate streets</a>`
			)
		}

		// TODO: ELASTICSERACH по всем полям,
		const contact = {
			firstNameId: getRandomInt(1, firstNameCount),
			lastNameId: getRandomInt(1, lastNameCount),
			middleNameId: getRandomInt(1, middleNameCount),
			streetId: getRandomInt(1, streetCount),
			house: faker.location.buildingNumber(),
			corpus: faker.location.buildingNumber(),
			flat: faker.number.int({ min: 1, max: 25 }),
			phone: faker.phone.number({ style: 'national' }),
		}
		contacts.push(contact)
	}
	try {
		Contact.bulkCreate(contacts)
		res.send(`Successfully created ${count} contacts.`)
	} catch (error) {
		res.send('Error creating data:', error)
	}
}

exports.update = async (req, res) => {
	const id = req.params.id

	try {
		// Find the contact first
		const contact = await Contact.findByPk(id, {
			include: [
				{ model: FirstName, as: 'firstName' },
				{ model: LastName, as: 'lastName' },
				{ model: MiddleName, as: 'middleName' },
				{ model: Street, as: 'street' },
			],
		})

		if (!contact) {
			return res.status(404).send({
				message: `Contact with id ${id} not found`,
			})
		}

		// Update firstName if provided
		if (req.body.firstName) {
			const [firstName, created] = await FirstName.findOrCreate({
				where: { firstName: req.body.firstName },
			})
			await contact.update({ firstNameId: firstName.id })
		}

		// Update lastName if provided
		if (req.body.lastName) {
			const [lastName, created] = await LastName.findOrCreate({
				where: { lastName: req.body.lastName },
			})
			await contact.update({ lastNameId: lastName.id })
		}

		// Update middleName if provided
		if (req.body.middleName) {
			const [middleName, created] = await MiddleName.findOrCreate({
				where: { middleName: req.body.middleName },
			})
			await contact.update({ middleNameId: middleName.id })
		}

		// Update street if provided
		if (req.body.street) {
			const [street, created] = await Street.findOrCreate({
				where: { street: req.body.street },
			})
			await contact.update({ streetId: street.id })
		}

		// Update contact fields
		await contact.update({
			house: req.body.house || contact.house,
			corpus: req.body.corpus || contact.corpus,
			flat: req.body.flat || contact.flat,
			phone: req.body.phone || contact.phone,
		})

		// Fetch updated contact with associations
		const updatedContact = await Contact.findByPk(id, {
			include: [
				{ model: FirstName, as: 'firstName' },
				{ model: LastName, as: 'lastName' },
				{ model: MiddleName, as: 'middleName' },
				{ model: Street, as: 'street' },
			],
		})

		// Format response data
		const modifiedData = {
			id: updatedContact.id,
			firstName: updatedContact.firstName.firstName,
			lastName: updatedContact.lastName.lastName,
			middleName: updatedContact.middleName.middleName,
			street: updatedContact.street.street,
			house: updatedContact.house,
			corpus: updatedContact.corpus,
			flat: updatedContact.flat,
			phone: updatedContact.phone,
		}

		res.send(modifiedData)
	} catch (error) {
		res.status(500).send({
			message: error.message || 'Error updating contact',
		})
	}
}

exports.create = async (req, res) => {
	try {
		// Создаем или находим записи в связанных таблицах
		const [firstName] = await FirstName.findOrCreate({
			where: { firstName: req.body.firstName },
		})

		const [lastName] = await LastName.findOrCreate({
			where: { lastName: req.body.lastName },
		})

		const [middleName] = await MiddleName.findOrCreate({
			where: { middleName: req.body.middleName },
		})

		const [street] = await Street.findOrCreate({
			where: { street: req.body.street },
		})

		// Создаем новый контакт
		const contact = await Contact.create({
			firstNameId: firstName.id,
			lastNameId: lastName.id,
			middleNameId: middleName.id,
			streetId: street.id,
			house: req.body.house,
			corpus: req.body.corpus,
			flat: req.body.flat,
			phone: req.body.phone,
		})

		// Получаем полные данные контакта со всеми связями
		const newContact = await Contact.findOne({
			where: { id: contact.id },
			include: [
				{
					model: FirstName,
					as: 'firstName',
				},
				{
					model: LastName,
					as: 'lastName',
				},
				{
					model: MiddleName,
					as: 'middleName',
				},
				{
					model: Street,
					as: 'street',
				},
			],
		})

		res.send({
			message: 'Contact was created successfully!',
			data: newContact,
		})
	} catch (err) {
		res.status(500).send({
			message: err.message || 'Some error occurred while creating the Contact.',
		})
	}
}

exports.delete = async (req, res) => {
	const id = req.params.id

	try {
		// Находим контакт перед удалением, чтобы вернуть его данные
		const contact = await Contact.findOne({
			where: { id: id },
			include: [
				{ model: FirstName, as: 'firstName' },
				{ model: LastName, as: 'lastName' },
				{ model: MiddleName, as: 'middleName' },
				{ model: Street, as: 'street' },
			],
		})

		if (!contact) {
			return res.status(404).send({
				message: `Contact with id ${id} not found`,
			})
		}

		// Форматируем данные перед удалением
		const modifiedData = {
			id: contact.id,
			firstName: contact.firstName.firstName,
			lastName: contact.lastName.lastName,
			middleName: contact.middleName.middleName,
			street: contact.street.street,
			house: contact.house,
			corpus: contact.corpus,
			flat: contact.flat,
			phone: contact.phone,
		}

		// Удаляем контакт
		await contact.destroy()

		// Возвращаем удаленные данные
		res.send(modifiedData)
	} catch (error) {
		res.status(500).send({
			message: error.message || 'Error deleting contact',
		})
	}
}
