const db = require('../models')
const Contact = db.contacts
const User = db.users
const Address = db.addresses

// exports.findAll = (req, res) => {
// 	Contact.findAll({
// 		include: [
// 			{
// 				model: User,
// 				as: 'user',
// 				include: [
// 					{
// 						model: Address,
// 						as: 'address',
// 					},
// 				],
// 			},
// 		],
// 		order: [['id', 'ASC']],
// 	})
// 		.then(data => {
// 			res.send(data)
// 		})
// 		.catch(err => {
// 			res.status(500).send({
// 				message:
// 					err.message || 'Some error occurred while retrieving contacts.',
// 			})
// 		})
// }

exports.findAll = (req, res) => {
	Contact.findAll({
		include: [
			{
				model: User,
				as: 'user',
			},
		],
		order: [['id', 'ASC']],
	})
		.then(data => {
			const modifiedData = data.map(contact => {
				return {
					id: contact.id,
					phone_number: contact.phone_number,
					is_important: contact.is_important,
					first_name: contact.user.first_name,
					last_name: contact.user.last_name,
				}
			})
			res.send(modifiedData)
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
				model: User,
				as: 'user',
				include: [
					{
						model: Address,
						as: 'address',
					},
				],
			},
		],
	})
		.then(data => {
			const modifiedData = {
				id: data.id,
				phone_number: data.phone_number,
				is_important: data.is_important,
				first_name: data.user.first_name,
				last_name: data.user.last_name,
				birth_date: data.user.birth_date,
				email: data.user.email,
				city: data.user.address.city,
				street: data.user.address.street,
				house_number: data.user.address.house_number,
				apartment_number: data.user.address.apartment_number,
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
