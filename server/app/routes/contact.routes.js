module.exports = app => {
	const contacts = require('../controllers/contact.controller')
	let router = require('express').Router()

	router.get('/findAll', contacts.findAll)

	router.get('/findById/:id', contacts.findById)

	app.use('/api/contacts', router)
}
