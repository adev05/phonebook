module.exports = (sequelize, Sequelize) => {
	const Contact = sequelize.define('contact', {
		phone_number: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		is_primary: {
			type: Sequelize.BOOLEAN,
			allowNull: false,
			defaultValue: false,
		},
	})

	return Contact
}
