module.exports = (sequelize, Sequelize) => {
	const FirstName = sequelize.define('firstName', {
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		firstName: {
			type: Sequelize.STRING,
			allowNull: false,
		},
	})

	return FirstName
}
