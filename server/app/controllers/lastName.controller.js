const db = require('../models')
const LastName = db.lastName

const { faker } = require('@faker-js/faker')

exports.generateByCount = (req, res) => {
	const count = req.params.count

	const lastNames = []
	for (let i = 0; i < count; i++) {
		const lastName = {
			lastName: faker.person.lastName(),
		}
		lastNames.push(lastName)
	}

	try {
		LastName.bulkCreate(lastNames)
		res.send(`Successfully created ${count} lastNames.`)
	} catch (error) {
		res.send('Error creating data:', error)
	}
}
