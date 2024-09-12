'use client'

import { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Label } from './ui/label'
import { Input } from './ui/input'
import StarIcon from '@heroicons/react/16/solid/StarIcon'

interface Contact {
	id: number
	phone_number: string
	is_important: boolean
	first_name: string
	last_name: string
	birth_date: Date // или Date, в зависимости от того, как вы хотите обрабатывать дату
	email: string
	city: string
	street: string
	house_number: string
	apartment_number: string
}

export default function Contact({
	selectedContactId,
}: {
	selectedContactId: number | undefined
}) {
	const [contact, setContact] = useState<Contact | null>(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		async function fetchContactById() {
			if (!selectedContactId) return

			setLoading(true)
			setError(null)

			try {
				let data = await fetch(
					'http://localhost:8080/api/contacts/findById/' + selectedContactId
				)
				if (!data.ok) {
					throw new Error('Failed to fetch contact')
				}
				let contact = await data.json()
				setContact(contact)
			} catch (error) {
				if (error instanceof Error) {
					setError(error.message)
				} else {
					setError('An unknown error occurred')
				}
			} finally {
				setLoading(false)
			}
		}

		fetchContactById()
	}, [selectedContactId])

	if (!selectedContactId) {
		return (
			<main className='grow flex items-center justify-center'>
				<Badge variant='secondary'>Выберите контакт</Badge>
			</main>
		)
	}

	if (loading) {
		return (
			<main className='grow flex items-center justify-center'>
				<Badge variant='secondary'>Загрузка...</Badge>
			</main>
		)
	}

	if (error) {
		return (
			<main className='grow flex items-center justify-center'>
				<Badge variant='secondary'>Ошибка...</Badge>
			</main>
		)
	}

	if (!contact) {
		return (
			<main className='grow flex items-center justify-center'>
				<Badge variant='secondary'>Контакт не найден</Badge>
			</main>
		)
	}

	return (
		<main className='grow flex flex-col gap-4 items-center justify-center'>
			<Avatar className='size-24'>
				<AvatarFallback>{`${contact.first_name[0]}${contact.last_name[0]}`}</AvatarFallback>
			</Avatar>
			<h1 className='text-lg font-semibold flex gap-2 items-center'>
				{`${contact.first_name} ${contact.last_name}`}
				{contact.is_important ? (
					<StarIcon className='size-4 text-yellow-500' />
				) : (
					''
				)}
			</h1>
			<div className='grid w-full max-w-sm items-center gap-1.5'>
				<Label htmlFor='phone'>Телефон</Label>
				<Input
					readOnly={true}
					type='text'
					id='phone'
					value={contact.phone_number}
				/>
			</div>
			{/* <p className='text-sm'>Важный: {contact.is_important ? 'Да' : 'Нет'}</p> */}
			<div className='grid w-full max-w-sm items-center gap-1.5'>
				<Label htmlFor='birth'>Дата рождения</Label>
				<Input
					readOnly={true}
					type='text'
					id='birth'
					value={new Date(contact.birth_date).toLocaleDateString()}
				/>
			</div>
			<div className='grid w-full max-w-sm items-center gap-1.5'>
				<Label htmlFor='email'>Email</Label>
				<Input readOnly={true} type='text' id='email' value={contact.email} />
			</div>

			<div className='grid w-full max-w-sm items-center gap-1.5'>
				<Label htmlFor='address'>Адрес</Label>
				<Input
					readOnly={true}
					type='text'
					id='address'
					value={`${contact.street}, ${contact.house_number}, ${contact.apartment_number}, ${contact.city}`}
				/>
			</div>
		</main>
	)
}
