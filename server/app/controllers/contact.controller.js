const db = require('../models')
const Contact = db.contact
const FirstName = db.firstName
const LastName = db.lastName
const MiddleName = db.middleName
const Street = db.street

const Op = db.Sequelize.Op

const { faker } = require('@faker-js/faker')

function count(where) {
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
		where,
	}).then(data => {
		return data
	})
}

exports.findAll = async (req, res) => {
	const limit = req.query.limit
	const page = req.query.page
	const offset = (page - 1) * limit
	const request = req.query.request
	const countNumber = await count({
		[Op.or]: [
			{ '$firstName.firstName$': { [Op.like]: `%${request}%` } },
			{ '$lastName.lastName$': { [Op.like]: `%${request}%` } },
		],
	})

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
		offset,
		limit,
		where: {
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

// exports.findByRequest = (req, res) => {
// 	const request = req.query.request

// 	Contact.findAll({
// 		include: [
// 			{
// 				model: FirstName,
// 				as: 'firstName',
// 			},
// 			{
// 				model: LastName,
// 				as: 'lastName',
// 			},
// 		],
// 		order: [
// 			[{ model: FirstName }, 'firstName', 'ASC'],
// 			[{ model: LastName }, 'lastName', 'ASC'],
// 		],
// 		where: {
// 			[Op.or]: [
// 				{ '$firstName.firstName$': { [Op.like]: `%${request}%` } },
// 				{ '$lastName.lastName$': { [Op.like]: `%${request}%` } },
// 			],
// 		},
// 	})
// 		.then(data => {
// 			const modifiedData = data.map(contact => {
// 				return {
// 					id: contact.id,
// 					firstName: contact.firstName.firstName,
// 					lastName: contact.lastName.lastName,
// 				}
// 			})
// 			res.send(modifiedData)
// 		})
// 		.catch(err => {
// 			res.status(500).send({
// 				message:
// 					err.message || 'Some error occurred while retrieving contacts.',
// 			})
// 		})
// }

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

exports.delete = (req, res) => {
	// const id = req.params.id
	// Contact.destroy({
	// 	where: { id: id },
	// })
	// 	.then(num => {
	// 		if (num == 1) {
	// 			res.send({
	// 				message: 'Contact was deleted successfully!',
	// 			})
	// 		} else {
	// 			res.send({
	// 				message: `Cannot delete Contact with id=${id}. Maybe Contact was not found!`,
	// 			})
	// 		}
	// 	})
	// 	.catch(err => {
	// 		res.status(500).send({
	// 			message: 'Could not delete Contact with id=' + id,
	// 		})
	// 	})
}
