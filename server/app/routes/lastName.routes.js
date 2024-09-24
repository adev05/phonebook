module.exports = app => {
	const lastNames = require('../controllers/lastName.controller')
	let router = require('express').Router()

	router.get('/generateByCount/:count', lastNames.generateByCount)

	app.use('/api/lastNames', router)
}
