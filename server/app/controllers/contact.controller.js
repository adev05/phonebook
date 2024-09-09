const db = require('../models')
const Contact = db.contacts
const Op = db.Sequelize.Op

// Create and Save a new Tutorial
exports.findAll = (req, res) => {
	// const title = req.query.title
	// var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null

	// Tutorial.findAll({ where: condition })
	// 	.then(data => {
	// 		res.send(data)
	// 	})
	// 	.catch(err => {
	// 		res.status(500).send({
	// 			message:
	// 				err.message || 'Some error occurred while retrieving tutorials.',
	// 		})
	// 	})

	Contact.findAll()
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
