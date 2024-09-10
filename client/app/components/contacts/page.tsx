'use client'

import { useDataContext } from '../../context/DataContext'

export default function Contacts() {
	const { selectedPhoneNumber } = useDataContext()

	if (!selectedPhoneNumber)
		return (
			<div className='flex w-full h-full justify-center items-center rounded border'>
				Выберите контакт
			</div>
		)

	return (
		<div className=''>
			<h1 className='text-lg font-medium mb-2'>Информация о контакте</h1>
			<h2 className='text-md font-medium mb-1'>
				{selectedPhoneNumber.phone_number}
			</h2>
			<p className='text-sm mb-1'>
				Важный: {selectedPhoneNumber.is_primary ? 'Да' : 'Нет'}
			</p>
			<h3 className='text-md font-medium mb-1'>Контакт</h3>
			<p className='text-sm mb-1'>
				ФИО: {selectedPhoneNumber.person.first_name}{' '}
				{selectedPhoneNumber.person.last_name}
			</p>
			<p className='text-sm mb-1'>Email: {selectedPhoneNumber.person.email}</p>
			<h3 className='text-md font-medium mb-1'>Адрес</h3>
			<p className='text-sm mb-1'>
				Город: {selectedPhoneNumber.person.address.city}
			</p>
			<p className='text-sm mb-1'>
				Улица: {selectedPhoneNumber.person.address.street}
			</p>
			<p className='text-sm mb-1'>
				Номер дома: {selectedPhoneNumber.person.address.house_number}
			</p>
			<p className='text-sm mb-1'>
				Квартира: {selectedPhoneNumber.person.address.apartment_number}
			</p>
		</div>
	)
}
