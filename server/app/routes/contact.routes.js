module.exports = app => {
	const contacts = require('../controllers/contact.controller')
	let router = require('express').Router()

	router.get('/findAll', contacts.findAll)

	app.use('/api/contacts', router)
}
