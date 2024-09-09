const dbConfig = require('../config/db.config.js')

const Sequelize = require('sequelize')
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
	host: dbConfig.HOST,
	dialect: dbConfig.dialect,

	pool: {
		max: dbConfig.pool.max,
		min: dbConfig.pool.min,
		acquire: dbConfig.pool.acquire,
		idle: dbConfig.pool.idle,
	},
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.persons = require('./person.model.js')(sequelize, Sequelize)
db.addresses = require('./address.model.js')(sequelize, Sequelize)
db.contacts = require('./contact.model.js')(sequelize, Sequelize)

db.contacts.belongsTo(db.persons, {
	foreignKey: 'person_id',
	as: 'person',
})

db.addresses.hasOne(db.persons, {
	foreignKey: 'address_id',
	as: 'person',
})

db.persons.belongsTo(db.addresses, {
	foreignKey: 'address_id',
	as: 'address',
})

module.exports = db
