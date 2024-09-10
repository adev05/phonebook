const db = require('../models')
const Contact = db.contacts
const Person = db.persons
const Address = db.addresses

exports.findAll = (req, res) => {
	Contact.findAll({
		include: [
			{
				model: Person,
				as: 'person',
				include: [
					{
						model: Address,
						as: 'address',
					},
				],
			},
		],
		order: [['id', 'ASC']],
	})
		.then(data => {
			res.send(data)
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || 'Some error occurred while retrieving contacts.',
			})
		})
}
