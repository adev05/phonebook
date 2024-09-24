const db = require('../models')
const MiddleName = db.middleName

const { faker } = require('@faker-js/faker')

exports.generateByCount = (req, res) => {
	const count = req.params.count

	const middleNames = []
	for (let i = 0; i < count; i++) {
		const middleName = {
			middleName: faker.person.middleName(),
		}
		middleNames.push(middleName)
	}

	try {
		MiddleName.bulkCreate(middleNames)
		res.send(`Successfully created ${count} middleNames.`)
	} catch (error) {
		res.send('Error creating data:', error)
	}
}
