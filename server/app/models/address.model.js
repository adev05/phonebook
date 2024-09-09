module.exports = (sequelize, Sequelize) => {
	const Address = sequelize.define('address', {
		city: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		street: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		house_number: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		apartment_number: {
			type: Sequelize.STRING,
			allowNull: true,
		},
	})

	return Address
}
