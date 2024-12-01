module.exports = app => {
	const contacts = require('../controllers/contact.controller')
	let router = require('express').Router()

	router.get('/findAll', contacts.findAll)

	// router.get('/count', contacts.count)

	// router.get('/findByRequest', contacts.findByRequest)

	router.get('/findById/:id', contacts.findById)

	router.get('/generateByCount/:count', contacts.generateByCount)

	router.put('/update/:id', contacts.update)

	router.delete('/delete/:id', contacts.delete)

	app.use('/api/contacts', router)
}
