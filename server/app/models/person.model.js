module.exports = (sequelize, Sequelize) => {
	const Person = sequelize.define('person', {
		first_name: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		last_name: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		middle_name: {
			type: Sequelize.STRING,
			allowNull: true,
		},
		birth_date: {
			type: Sequelize.DATE,
			allowNull: true,
		},
		email: {
			type: Sequelize.STRING,
			allowNull: true,
		},
	})

	return Person
}
