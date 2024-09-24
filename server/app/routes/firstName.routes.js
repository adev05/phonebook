module.exports = app => {
	const firstNames = require('../controllers/firstName.controller')
	let router = require('express').Router()

	router.get('/generateByCount/:count', firstNames.generateByCount)

	app.use('/api/firstNames', router)
}
