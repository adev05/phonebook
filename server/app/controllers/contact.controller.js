const db = require('../models')
const Contact = db.contact
const FirstName = db.firstName
const LastName = db.lastName
const MiddleName = db.middleName
const Street = db.street
// const User = db.users
// const Address = db.addresses

const { faker } = require('@faker-js/faker')

exports.findAll = (req, res) => {
	// Contact.findAll({
	// 	include: [
	// 		{
	// 			model: User,
	// 			as: 'user',
	// 		},
	// 	],
	// 	order: [
	// 		[{ model: User }, 'first_name', 'ASC'],
	// 		[{ model: User }, 'last_name', 'ASC'],
	// 	],
	// })
	// 	.then(data => {
	// 		const modifiedData = data.map(contact => {
	// 			return {
	// 				id: contact.id,
	// 				phone_number: contact.phone_number,
	// 				is_important: contact.is_important,
	// 				first_name: contact.user.first_name,
	// 				last_name: contact.user.last_name,
	// 			}
	// 		})
	// 		res.send(modifiedData)
	// 	})
	// 	.catch(err => {
	// 		res.status(500).send({
	// 			message:
	// 				err.message || 'Some error occurred while retrieving contacts.',
	// 		})
	// 	})
}

exports.findById = (req, res) => {
	// const id = req.params.id
	// Contact.findOne({
	// 	where: { id: id },
	// 	include: [
	// 		{
	// 			model: User,
	// 			as: 'user',
	// 			include: [
	// 				{
	// 					model: Address,
	// 					as: 'address',
	// 				},
	// 			],
	// 		},
	// 	],
	// })
	// 	.then(data => {
	// 		const modifiedData = {
	// 			id: data.id,
	// 			phone_number: data.phone_number,
	// 			is_important: data.is_important,
	// 			first_name: data.user.first_name,
	// 			last_name: data.user.last_name,
	// 			birth_date: data.user.birth_date,
	// 			email: data.user.email,
	// 			city: data.user.address.city,
	// 			street: data.user.address.street,
	// 			house_number: data.user.address.house_number,
	// 			apartment_number: data.user.address.apartment_number,
	// 		}
	// 		res.send(modifiedData)
	// 	})
	// 	.catch(err => {
	// 		res.status(500).send({
	// 			message:
	// 				err.message || 'Some error occurred while retrieving contacts.',
	// 		})
	// 	})
}

exports.generateByCount = (req, res) => {
	const count = req.params.count
	const contacts = []
	for (let i = 0; i < count; i++) {
		const firstNameId = FirstName.findOne({
			order: db.sequelize.random(),
		}).then(encounter => {
			return encounter.id
		})
		const lastNameId = 0
		const middleNameId = 0
		const streetId = 0

		// TODO: ELASTICSERACH по всем полям,
		const contact = {
			firstNameId,
			lastNameId,
			middleNameId,
			streetId,
			house: '0',
			corpus: '0',
			flat: 0,
			phone: faker.phone.number({ style: 'national' }),
		}
		console.log(contact)
		contacts.push(contact)
	}
	try {
		// Contact.bulkCreate(contacts)
		res.send(`Successfully created ${count} contacts.`)
	} catch (error) {
		res.send('Error creating data:', error)
	}
	// const createData = async numUsers => {
	// 	const users = []
	// 	const contacts = []
	// 	const addresses = []
	// 	for (let i = 0; i < numUsers; i++) {
	// 		const user = {
	// 			first_name: faker.person.firstName(),
	// 			last_name: faker.person.lastName(),
	// 			birth_date: faker.date.between({
	// 				from: '1970-01-01T00:00:00.000Z',
	// 				to: '2023-01-01T00:00:00.000Z',
	// 			}),
	// 			email: faker.internet.email(),
	// 		}
	// 		users.push(user)
	// 	}
	// 	try {
	// 		// Создание пользователей
	// 		const createdUsers = await db.users.bulkCreate(users, { returning: true })
	// 		// Создание контактов и адресов для каждого пользователя
	// 		for (const user of createdUsers) {
	// 			contacts.push({
	// 				phone_number: faker.phone.number({ style: 'national' }),
	// 				is_important: faker.datatype.boolean(),
	// 				user_id: user.id,
	// 			})
	// 			addresses.push({
	// 				city: faker.location.city(),
	// 				street: faker.location.street(),
	// 				house_number: faker.location.buildingNumber(),
	// 				apartment_number: faker.location.secondaryAddress(),
	// 				user_id: user.id,
	// 			})
	// 		}
	// 		// Создание контактов
	// 		await db.contacts.bulkCreate(contacts)
	// 		// Создание адресов
	// 		await db.addresses.bulkCreate(addresses)
	// 		console.log(
	// 			`Successfully created ${numUsers} users with contacts and addresses.`
	// 		)
	// 		res.send(
	// 			`Successfully created ${numUsers} users with contacts and addresses.`
	// 		)
	// 	} catch (error) {
	// 		console.error('Error creating data:', error)
	// 		res.send('Error creating data:', error)
	// 	}
	// }
	// createData(count)
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
