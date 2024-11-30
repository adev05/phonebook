'use client'

import { observer } from 'mobx-react-lite'
// import { Dispatch, SetStateAction, useState } from 'react'
// import { Badge } from './ui/badge'
// import { Avatar, AvatarFallback } from './ui/avatar'
// import { Label } from './ui/label'
// import { Input } from './ui/input'
// import { ArrowLongLeftIcon, PencilIcon } from '@heroicons/react/16/solid'
import React from 'react'

const Contact: React.FC<{ contactId: number }> = observer(({ contactId }) => {
	console.log('contact has been rendered')
	return <p>Contact {contactId}</p>
	// const [contact, setContact] = React.useState<Contact | null>(null)
	// const [loading, setLoading] = React.useState(false)
	// const [error, setError] = React.useState<string | null>(null)

	// React.useEffect(() => {
	// 	async function fetchContact() {
	// 		if (!selectedContactId) return

	// 		setLoading(true)
	// 		setError(null)

	// 		try {
	// 			const data = await fetch(
	// 				'http://localhost:8080/api/contacts/findById/' + selectedContactId
	// 			)
	// 			if (!data.ok) {
	// 				throw new Error('Failed to fetch contact')
	// 			}
	// 			const contact = await data.json()
	// 			setContact(contact)
	// 		} catch (error) {
	// 			if (error instanceof Error) {
	// 				setError(error.message)
	// 			} else {
	// 				setError('An unknown error occurred')
	// 			}
	// 		} finally {
	// 			setLoading(false)
	// 		}
	// 	}

	// 	fetchContact()
	// }, [selectedContactId])

	// // async function deleteContact(id: number) {
	// // 	console.log('deleteContact', id)
	// // 	setLoading(true)
	// // 	setError(null)

	// // 	try {
	// // 		let data = await fetch(
	// // 			'http://localhost:8080/api/contacts/delete/' + selectedContactId,
	// // 			{
	// // 				method: 'DELETE',
	// // 				headers: {
	// // 					'Content-Type': 'application/json',
	// // 				},
	// // 			}
	// // 		)
	// // 		if (!data.ok) {
	// // 			throw new Error('Failed to fetch contact')
	// // 		}
	// // 		console.log('Item deleted successfully')

	// // 		setDeletedContactId(id)
	// // 	} catch (error) {
	// // 		if (error instanceof Error) {
	// // 			setError(error.message)
	// // 		} else {
	// // 			setError('An unknown error occurred')
	// // 		}
	// // 	} finally {
	// // 		setLoading(false)
	// // 	}
	// // }

	// function editContact() {
	// 	console.log('editContact')
	// }

	// if (!selectedContactId) {
	// 	return (
	// 		<main className='grow flex items-center justify-center'>
	// 			<Badge variant='secondary'>Выберите контакт</Badge>
	// 		</main>
	// 	)
	// }

	// if (loading) {
	// 	return (
	// 		<main className='grow flex items-center justify-center'>
	// 			<Badge variant='secondary'>Загрузка...</Badge>
	// 		</main>
	// 	)
	// }

	// if (error) {
	// 	return (
	// 		<main className='grow flex items-center justify-center'>
	// 			<Badge variant='secondary'>Ошибка...</Badge>
	// 		</main>
	// 	)
	// }

	// if (!contact) {
	// 	return (
	// 		<main className='grow flex items-center justify-center'>
	// 			<Badge variant='secondary'>Контакт не найден</Badge>
	// 		</main>
	// 	)
	// }

	// return (
	// 	<main className='grow flex flex-col gap-4 items-center justify-center'>
	// 		<div className='flex justify-between items-center w-full max-w-sm'>
	// 			<Badge
	// 				variant='outline'
	// 				className='font-thin cursor-pointer'
	// 				onClick={() => setSelectedContactId(undefined)}
	// 			>
	// 				<ArrowLongLeftIcon className='size-3.5' />
	// 				<p className='text-sm ml-2'>Назад</p>
	// 			</Badge>
	// 			<Badge
	// 				variant='outline'
	// 				className='font-thin cursor-pointer'
	// 				onClick={() => editContact()}
	// 			>
	// 				<PencilIcon className='size-3.5' />
	// 				<p className='text-sm ml-2'>Изменить</p>
	// 			</Badge>
	// 		</div>
	// 		<Avatar className='size-24 cursor-pointer' id='avatar'>
	// 			<AvatarFallback>{`${contact.firstName[0]}${contact.lastName[0]}`}</AvatarFallback>
	// 		</Avatar>
	// 		<h1 className='text-lg font-semibold flex gap-2 items-center'>
	// 			{`${contact.firstName} ${contact.middleName} ${contact.lastName}`}
	// 		</h1>
	// 		<div className='grid w-full max-w-sm items-center gap-1.5'>
	// 			<Label htmlFor='phone'>Телефон</Label>
	// 			<Input readOnly={true} type='text' id='phone' value={contact.phone} />
	// 		</div>

	// 		<div className='flex gap-2'>
	// 			<div className='grid w-full max-w-sm items-center gap-1.5'>
	// 				<Label htmlFor='street'>Улица</Label>
	// 				<Input
	// 					readOnly={true}
	// 					type='text'
	// 					id='street'
	// 					value={contact.street}
	// 				/>
	// 			</div>
	// 			<div className='grid w-full max-w-sm items-center gap-1.5'>
	// 				<Label htmlFor='house'>Дом</Label>
	// 				<Input readOnly={true} type='text' id='house' value={contact.house} />
	// 			</div>
	// 		</div>
	// 		<div className='flex gap-2'>
	// 			<div className='grid w-full max-w-sm items-center gap-1.5'>
	// 				<Label htmlFor='corpus'>Корпус</Label>
	// 				<Input
	// 					readOnly={true}
	// 					type='text'
	// 					id='corpus'
	// 					value={contact.corpus}
	// 				/>
	// 			</div>
	// 			<div className='grid w-full max-w-sm items-center gap-1.5'>
	// 				<Label htmlFor='flat'>Квартира</Label>
	// 				<Input readOnly={true} type='text' id='flat' value={contact.flat} />
	// 			</div>
	// 		</div>
	// 	</main>
	// )
})

export default Contact
