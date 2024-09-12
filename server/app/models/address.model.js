module.exports = (sequelize, Sequelize) => {
	const Address = sequelize.define('address', {
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
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
		},
	})

	return Address
}
