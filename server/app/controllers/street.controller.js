const db = require('../models')
const Street = db.street

const { faker } = require('@faker-js/faker')

exports.generateByCount = (req, res) => {
	const count = req.params.count

	const streets = []
	for (let i = 0; i < count; i++) {
		const street = {
			street: faker.location.street(),
		}
		streets.push(street)
	}

	try {
		Street.bulkCreate(streets)
		res.send(`Successfully created ${count} streets.`)
	} catch (error) {
		res.send('Error creating data:', error)
	}
}
