module.exports = app => {
	const middleNames = require('../controllers/middleName.controller')
	let router = require('express').Router()

	router.get('/generateByCount/:count', middleNames.generateByCount)

	app.use('/api/middleNames', router)
}
