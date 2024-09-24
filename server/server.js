const express = require('express')
const cors = require('cors')
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
db.sequelize.sync({ force: true }).then(() => {
	console.log('Drop and re-sync db.')
})

// simple route
app.get('/', (req, res) => {
	// res.json({ message: 'Welcome to bezkoder application.' })
	res.json()
})

require('./app/routes/contact.routes')(app)
require('./app/routes/firstName.routes')(app)
require('./app/routes/lastName.routes')(app)
require('./app/routes/middleName.routes')(app)
require('./app/routes/street.routes')(app)

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
