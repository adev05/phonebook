module.exports = (sequelize, Sequelize) => {
	const Contact = sequelize.define('contact', {
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		house: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		corpus: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		flat: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
		phone: {
			type: Sequelize.STRING,
			allowNull: false,
		},
	})

	return Contact
}
