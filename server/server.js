const express = require('express')
const cors = require('cors')
const { faker } = require('@faker-js/faker')
const app = express()

var corsOptions = {
	origin: 'http://localhost:3000',
}

app.use(cors(corsOptions))

// parse requests of content-type - application/json
app.use(express.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

const db = require('./app/models')
db.sequelize
	.sync()
	.then(() => {
		console.log('Synced db.')
	})
	.catch(err => {
		console.log('Failed to sync db: ' + err.message)
	})

// drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
// 	console.log('Drop and re-sync db.')
// })

// simple route
app.get('/', (req, res) => {
	// res.json({ message: 'Welcome to bezkoder application.' })
	res.json()
})

require('./app/routes/contact.routes')(app)

const createData = async numUsers => {
	const users = []
	const contacts = []
	const addresses = []

	for (let i = 0; i < numUsers; i++) {
		const user = {
			first_name: faker.person.firstName(),
			last_name: faker.person.lastName(),
			birth_date: faker.date.between({
				from: '1970-01-01T00:00:00.000Z',
				to: '2023-01-01T00:00:00.000Z',
			}),
			email: faker.internet.email(),
		}
		users.push(user)
	}

	try {
		// Создание пользователей
		const createdUsers = await db.users.bulkCreate(users, { returning: true })

		// Создание контактов и адресов для каждого пользователя
		for (const user of createdUsers) {
			contacts.push({
				phone_number: faker.phone.number({ style: 'national' }),
				is_important: faker.datatype.boolean(),
				user_id: user.id,
			})

			addresses.push({
				city: faker.location.city(),
				street: faker.location.street(),
				house_number: faker.location.buildingNumber(),
				apartment_number: faker.location.secondaryAddress(),
				user_id: user.id,
			})
		}

		// Создание контактов
		await db.contacts.bulkCreate(contacts)

		// Создание адресов
		await db.addresses.bulkCreate(addresses)

		console.log(
			`Successfully created ${numUsers} users with contacts and addresses.`
		)
	} catch (error) {
		console.error('Error creating data:', error)
	}
}

// Создание 100 пользователей с контактами и адресами
createData(100)

// set port, listen for requests
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`)
})

/*

[
	{
		phone: String,
		is_primary: Boolean [default False],
		person: {
			name: String,
			surname: String | Null,
			birth_date: Date | Null,
			email: String | Null,
			address: {
				city: String,
				street: String,
				house_number: String,
				apartment_number: String,
			} | Null,
		}
	},
]

*/
