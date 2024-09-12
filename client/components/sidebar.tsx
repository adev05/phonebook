'use client'

import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Skeleton } from './ui/skeleton'
import { BeakerIcon, StarIcon } from '@heroicons/react/16/solid'

interface Contact {
	id: number
	phone_number: string
	is_important: boolean
	first_name: string
	last_name: string
}

type Contacts = Contact[]

export default function Sidebar({
	selectedContactId,
	setSelectedContactId,
}: {
	selectedContactId: number | undefined
	setSelectedContactId: Dispatch<SetStateAction<number | undefined>>
}) {
	const [contacts, setContacts] = useState<Contacts>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		async function fetchContacts() {
			setLoading(true)
			setError(null)

			try {
				let data = await fetch('http://localhost:8080/api/contacts/findAll')
				if (!data.ok) {
					throw new Error('Failed to fetch contacts')
				}
				let contacts = await data.json()
				setContacts(contacts)
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

		fetchContacts()
	}, [])

	if (loading) {
		return (
			<aside className='w-60 h-full'>
				<h1 className='text-lg font-semibold mb-2'>Контакты</h1>

				<div className=''>
					{new Array(100).fill(0).map((item, index) => (
						<div
							className='px-3 h-[38px] flex items-center border border-transparent'
							key={index}
						>
							<Skeleton className='w-8/12 h-2 rounded-full' />
						</div>
					))}
				</div>
			</aside>
		)
	}

	return (
		<aside className='w-60 h-full flex flex-col'>
			<h1 className='text-lg font-semibold mb-2'>Контакты</h1>

			{contacts.length != 0 ? (
				<div className='overflow-auto'>
					{contacts.map(contact => (
						<div
							className={`rounded-xl text-sm py-2 px-3 cursor-pointer flex justify-between items-center border ${
								selectedContactId == contact.id
									? ''
									: 'border-transparent hover:bg-slate-50'
							}`}
							key={contact.id}
							onClick={() => setSelectedContactId(contact.id)}
						>
							<p>{`${contact.first_name} ${contact.last_name}`}</p>

							{contact.is_important ? (
								<StarIcon className='size-4 text-yellow-500' />
							) : (
								''
							)}
						</div>
					))}
				</div>
			) : (
				<p className='text-sm p-2 flex justify-between'>Список пуст</p>
			)}
		</aside>
	)
}
