module.exports = (sequelize, Sequelize) => {
	const MiddleName = sequelize.define('middleName', {
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		middleName: {
			type: Sequelize.STRING,
			allowNull: false,
		},
	})

	return MiddleName
}
