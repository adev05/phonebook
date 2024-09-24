module.exports = app => {
	const streets = require('../controllers/street.controller')
	let router = require('express').Router()

	router.get('/generateByCount/:count', streets.generateByCount)

	app.use('/api/streets', router)
}
