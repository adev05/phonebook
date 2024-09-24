module.exports = (sequelize, Sequelize) => {
	const LastName = sequelize.define('lastName', {
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		lastName: {
			type: Sequelize.STRING,
			allowNull: false,
		},
	})

	return LastName
}

// ф и о, улица, дом, корпус, квартира, телефон
