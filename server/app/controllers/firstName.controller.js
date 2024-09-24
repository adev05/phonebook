const db = require('../models')
const FirstName = db.firstName

const { faker } = require('@faker-js/faker')

exports.generateByCount = (req, res) => {
	const count = req.params.count

	const firstNames = []
	for (let i = 0; i < count; i++) {
		const firstName = {
			firstName: faker.person.firstName(),
		}
		firstNames.push(firstName)
	}

	try {
		FirstName.bulkCreate(firstNames)
		res.send(`Successfully created ${count} firstNames.`)
	} catch (error) {
		res.send('Error creating data:', error)
	}
}
