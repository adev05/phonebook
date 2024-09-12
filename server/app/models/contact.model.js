module.exports = (sequelize, Sequelize) => {
	const Contact = sequelize.define('contact', {
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		phone_number: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		is_important: {
			type: Sequelize.BOOLEAN,
			defaultValue: false,
		},
	})

	return Contact
}
