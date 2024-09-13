'use client'

import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Skeleton } from './ui/skeleton'
import { StarIcon } from '@heroicons/react/16/solid'
import {
	Bars3BottomRightIcon,
	EllipsisVerticalIcon,
	PlusIcon,
} from '@heroicons/react/20/solid'
import {
	Menubar,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarSeparator,
	MenubarShortcut,
	MenubarSub,
	MenubarSubContent,
	MenubarSubTrigger,
	MenubarTrigger,
} from './ui/menubar'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Button } from './ui/button'
import { DropdownMenuGroup } from '@radix-ui/react-dropdown-menu'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from './ui/input-otp'

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
	deletedContactId,
	setDeletedContactId,
}: {
	selectedContactId: number | undefined
	setSelectedContactId: Dispatch<SetStateAction<number | undefined>>
	deletedContactId: number | undefined
	setDeletedContactId: Dispatch<SetStateAction<number | undefined>>
}) {
	const [contacts, setContacts] = useState<Contacts>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const [sortBy, setSortBy] = useState('asc')

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

	useEffect(() => {
		if (deletedContactId) {
			setContacts(contacts.filter(contact => contact.id != deletedContactId))
			setSelectedContactId(undefined)
			setDeletedContactId(undefined)
		}
	}, [deletedContactId])

	function changeSortBy(value: string) {
		if (value != sortBy) {
			setContacts(contacts.reverse())
			setSortBy(value)
		}
	}

	if (loading) {
		return (
			<aside className='w-60 h-full'>
				<div className='flex justify-between items-center mb-2 h-7'>
					<h1 className='text-lg font-semibold'>Контакты</h1>
				</div>

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
			<div className='flex justify-between items-center mb-2'>
				<h1 className='text-lg font-semibold'>Контакты</h1>

				<Dialog>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant='outline' size='icon' className='w-7 h-7'>
								<EllipsisVerticalIcon className='size-4' />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className='w-64'>
							<DropdownMenuLabel>Сортировать по</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuRadioGroup
								value={sortBy}
								onValueChange={value => changeSortBy(value)}
							>
								<DropdownMenuRadioItem value='asc'>
									возрастанию
									<DropdownMenuShortcut>А-Я</DropdownMenuShortcut>
								</DropdownMenuRadioItem>
								<DropdownMenuRadioItem value='desc'>
									убыванию
									<DropdownMenuShortcut>Я-А</DropdownMenuShortcut>
								</DropdownMenuRadioItem>
							</DropdownMenuRadioGroup>
							<DropdownMenuSeparator />
							<DropdownMenuGroup>
								<DialogTrigger asChild>
									<DropdownMenuItem>Добавить контакт</DropdownMenuItem>
								</DialogTrigger>
							</DropdownMenuGroup>
						</DropdownMenuContent>
					</DropdownMenu>
					<DialogContent>
						<DialogHeader>
							<DialogTitle className='mb-4'>Новый контакт</DialogTitle>
							<div className='flex flex-col gap-4'>
								<div className='flex flex-col items-center gap-1.5'>
									<Label htmlFor='first_name' className='mr-auto'>
										Имя
										<span className='text-red-600'>*</span>
									</Label>
									<Input type='text' id='first_name' />
								</div>
								<div className='flex flex-col items-center gap-1.5'>
									<Label htmlFor='last_name' className='mr-auto'>
										Фамилия
									</Label>
									<Input type='text' id='last_name' />
								</div>
								<div className='flex flex-col items-center gap-1.5'>
									<Label htmlFor='phone_number' className='mr-auto'>
										Телефон
										<span className='text-red-600'>*</span>
									</Label>

									<div className='flex'>
										<InputOTP maxLength={10}>
											<InputOTPGroup>
												<InputOTPSlot index={0} />
												<InputOTPSlot index={1} />
												<InputOTPSlot index={2} />
											</InputOTPGroup>
											<InputOTPSeparator />
											<InputOTPGroup>
												<InputOTPSlot index={3} />
												<InputOTPSlot index={4} />
												<InputOTPSlot index={5} />
											</InputOTPGroup>
											<InputOTPSeparator />
											<InputOTPGroup>
												<InputOTPSlot index={6} />
												<InputOTPSlot index={7} />
											</InputOTPGroup>
											<InputOTPSeparator />
											<InputOTPGroup>
												<InputOTPSlot index={8} />
												<InputOTPSlot index={9} />
											</InputOTPGroup>
										</InputOTP>
									</div>
								</div>
							</div>
						</DialogHeader>
						<DialogFooter>
							<DialogClose asChild>
								<Button type='button' variant='secondary'>
									Отмена
								</Button>
							</DialogClose>
							<Button type='submit'>Добавить</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>

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
