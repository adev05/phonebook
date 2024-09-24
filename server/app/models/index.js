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

// db.users = require('./user.model.js')(sequelize, Sequelize)
// db.addresses = require('./address.model.js')(sequelize, Sequelize)
// db.contacts = require('./contact.model.js')(sequelize, Sequelize)

db.contact = require('./contact.model.js')(sequelize, Sequelize)
db.firstName = require('./firstName.model.js')(sequelize, Sequelize)
db.lastName = require('./lastName.model.js')(sequelize, Sequelize)
db.middleName = require('./middleName.model.js')(sequelize, Sequelize)
db.street = require('./street.model.js')(sequelize, Sequelize)

db.firstName.hasOne(db.contact, { foreignKey: 'firstNameId' })
db.contact.belongsTo(db.firstName, { foreignKey: 'firstNameId' })

db.lastName.hasOne(db.contact, { foreignKey: 'lastNameId' })
db.contact.belongsTo(db.lastName, { foreignKey: 'lastNameId' })

db.middleName.hasOne(db.contact, { foreignKey: 'middleNameId' })
db.contact.belongsTo(db.middleName, { foreignKey: 'middleNameId' })

db.street.hasOne(db.contact, { foreignKey: 'streetId' })
db.contact.belongsTo(db.street, { foreignKey: 'streetId' })

// db.users.hasOne(db.contacts, { foreignKey: 'user_id' })
// db.contacts.belongsTo(db.users, { foreignKey: 'user_id' })

// db.users.hasOne(db.addresses, { foreignKey: 'user_id' })
// db.addresses.belongsTo(db.users, { foreignKey: 'user_id' })

module.exports = db
