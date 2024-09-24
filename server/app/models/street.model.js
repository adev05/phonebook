module.exports = (sequelize, Sequelize) => {
	const Street = sequelize.define('street', {
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		street: {
			type: Sequelize.STRING,
			allowNull: false,
		},
	})

	return Street
}

// ф и о, улица, дом, корпус, квартира, телефон
