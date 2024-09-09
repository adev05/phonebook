const express = require('express')
const cors = require('cors')

const app = express()

var corsOptions = {
	origin: 'http://localhost:8081',
}

app.use(cors(corsOptions))

// parse requests of content-type - application/json
app.use(express.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

const db = require('./app/models')
db.sequelize
	.sync()
	.then(() => {
		console.log('Synced db.')
	})
	.catch(err => {
		console.log('Failed to sync db: ' + err.message)
	})

// drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
// 	console.log('Drop and re-sync db.')
// })

// simple route
app.get('/', (req, res) => {
	// res.json({ message: 'Welcome to bezkoder application.' })
	res.json()
})

// require('./app/routes/turorial.routes')(app)
require('./app/routes/contact.routes')(app)

const addresses = [
	{
		city: 'Москва',
		street: 'Ленина',
		house_number: '15',
		apartment_number: '34',
	},
	{
		city: 'Санкт-Петербург',
		street: 'Невского',
		house_number: '23',
		apartment_number: '12',
	},
	{
		city: 'Новосибирск',
		street: 'Красный Проспект',
		house_number: '45',
		apartment_number: '56',
	},
	{
		city: 'Екатеринбург',
		street: 'Малышева',
		house_number: '78',
		apartment_number: '90',
	},
	{
		city: 'Казань',
		street: 'Баумана',
		house_number: '34',
		apartment_number: '23',
	},
	{
		city: 'Нижний Новгород',
		street: 'Большая Покровская',
		house_number: '56',
		apartment_number: '45',
	},
	{
		city: 'Ростов-на-Дону',
		street: 'Буденновский Проспект',
		house_number: '67',
		apartment_number: '78',
	},
	{
		city: 'Самара',
		street: 'Ленинская',
		house_number: '89',
		apartment_number: '101',
	},
	{
		city: 'Омск',
		street: 'Ленина',
		house_number: '12',
		apartment_number: '15',
	},
	{
		city: 'Красноярск',
		street: 'Карла Маркса',
		house_number: '34',
		apartment_number: '56',
	},
].map(address => db.addresses.create(address))

// Создание контактов
const contacts = [
	{
		first_name: 'Иван',
		last_name: 'Иванов',
		birth_date: '1985-03-15',
		email: 'ivan.ivanov@example.com',
		note: 'Друг с университета',
	},
	{
		first_name: 'Анна',
		last_name: 'Петрова',
		birth_date: '1990-07-22',
		email: 'anna.petrova@example.com',
		note: 'Коллега по работе',
	},
	{
		first_name: 'Сергей',
		last_name: 'Смирнов',
		birth_date: '1988-11-05',
		email: 'sergey.smirnov@example.com',
		note: 'Родственник',
	},
	{
		first_name: 'Ольга',
		last_name: 'Козлова',
		birth_date: '1992-09-18',
		email: 'olga.kozlova@example.com',
		note: 'Подруга со школы',
	},
	{
		first_name: 'Дмитрий',
		last_name: 'Васильев',
		birth_date: '1987-04-30',
		email: 'dmitry.vasilev@example.com',
		note: 'Сосед',
	},
	{
		first_name: 'Елена',
		last_name: 'Морозова',
		birth_date: '1995-12-12',
		email: 'elena.morozova@example.com',
		note: 'Коллега по работе',
	},
	{
		first_name: 'Андрей',
		last_name: 'Лебедев',
		birth_date: '1989-08-25',
		email: 'andrey.lebedev@example.com',
		note: 'Друг с детства',
	},
	{
		first_name: 'Мария',
		last_name: 'Соколова',
		birth_date: '1993-06-03',
		email: 'maria.sokolova@example.com',
		note: 'Подруга со школы',
	},
	{
		first_name: 'Алексей',
		last_name: 'Орлов',
		birth_date: '1986-10-10',
		email: 'alexey.orlov@example.com',
		note: 'Коллега по работе',
	},
	{
		first_name: 'Татьяна',
		last_name: 'Федорова',
		birth_date: '1991-02-28',
		email: 'tatyana.fedorova@example.com',
		note: 'Родственница',
	},
].map((contact, index) =>
	db.persons.create({ ...contact, address_id: index + 1 })
)

// Создание телефонных номеров
const phoneNumbers = [
	{
		phone_number: '+7 (916) 123-45-67',
		contact_type: 'mobile',
		is_primary: true,
		person_id: 1,
	},
	{
		phone_number: '+7 (921) 987-65-43',
		contact_type: 'mobile',
		is_primary: true,
		person_id: 2,
	},
	{
		phone_number: '+7 (903) 111-22-33',
		contact_type: 'mobile',
		is_primary: true,
		person_id: 3,
	},
	{
		phone_number: '+7 (912) 345-67-89',
		contact_type: 'mobile',
		is_primary: true,
		person_id: 4,
	},
	{
		phone_number: '+7 (905) 555-66-77',
		contact_type: 'mobile',
		is_primary: true,
		person_id: 5,
	},
	{
		phone_number: '+7 (910) 777-88-99',
		contact_type: 'mobile',
		is_primary: true,
		person_id: 6,
	},
	{
		phone_number: '+7 (906) 222-33-44',
		contact_type: 'mobile',
		is_primary: true,
		person_id: 7,
	},
	{
		phone_number: '+7 (917) 444-55-66',
		contact_type: 'mobile',
		is_primary: true,
		person_id: 8,
	},
	{
		phone_number: '+7 (908) 666-77-88',
		contact_type: 'mobile',
		is_primary: true,
		person_id: 9,
	},
	{
		phone_number: '+7 (913) 888-99-00',
		contact_type: 'mobile',
		is_primary: true,
		person_id: 10,
	},
].map(phone => db.contacts.create(phone))

// Выполнение всех операций
Promise.all([...addresses, ...contacts, ...phoneNumbers])
	.then(() => {
		console.log('Контакты успешно созданы!')
	})
	.catch(error => {
		console.error('Ошибка при создании контактов:', error)
	})
// set port, listen for requests
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`)
})
