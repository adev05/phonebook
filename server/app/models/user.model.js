module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define('user', {
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		first_name: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		last_name: {
			type: Sequelize.STRING,
		},
		birth_date: {
			type: Sequelize.DATE,
			allowNull: true,
		},
		email: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true,
		},
	})

	return User
}
