'use client'

import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Skeleton } from './ui/skeleton'
import {
	EllipsisVerticalIcon,
	MagnifyingGlassIcon,
} from '@heroicons/react/20/solid'
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
import { ScrollArea } from './ui/scroll-area'

import { useIntersectionObserver, useQuery } from '@siberiacancode/reactuse'

interface Contact {
	id: number
	firstName: string
	lastName: string
}

type Contacts = Contact[]

const LIMIT = 25

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
	const [offset, setOffset] = useState<number>(0)
	const [contacts, setContacts] = useState<Contacts>([])
	const [sortBy, setSortBy] = useState('asc')

	const { isLoading, isError, isSuccess, error } = useQuery(
		() =>
			fetch(
				`http://localhost:8080/api/contacts/findAll?limit=${LIMIT}&offset=${offset}`
			)
				.then(res => res.json())
				.then(res => res as Promise<Contacts>),
		{
			keys: [offset],
			onSuccess: fetchedContacts => {
				setContacts(prevContacts => [...prevContacts, ...fetchedContacts])
			},
		}
	)

	const { ref } = useIntersectionObserver<HTMLDivElement>({
		threshold: 1,
		onChange: entry => {
			if (entry.isIntersecting) setOffset(prev => prev + LIMIT)
		},
	})

	function changeSortBy(value: string) {
		if (value != sortBy) {
			setContacts(contacts.reverse())
			setSortBy(value)
		}
	}

	if (isError) {
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

	if (isLoading && !contacts.length)
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

	if (isSuccess)
		return (
			<aside className='w-60 h-full flex flex-col'>
				<div className='flex justify-between items-center mb-2'>
					<h1 className='text-lg font-semibold'>Контакты</h1>

					<Dialog>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant='outline' size='icon' className='w-8 h-8'>
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
									<DropdownMenuRadioItem value='asc' disabled>
										возрастанию
										<DropdownMenuShortcut>А-Я</DropdownMenuShortcut>
									</DropdownMenuRadioItem>
									<DropdownMenuRadioItem value='desc' disabled>
										убыванию
										<DropdownMenuShortcut>Я-А</DropdownMenuShortcut>
									</DropdownMenuRadioItem>
								</DropdownMenuRadioGroup>
								<DropdownMenuSeparator />
								<DropdownMenuGroup>
									<DialogTrigger asChild>
										<DropdownMenuItem disabled>
											Добавить контакт
										</DropdownMenuItem>
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
				<div className='flex gap-2 items-center mb-2'>
					<Input
						placeholder='Поиск по контактам'
						className='w-full h-8 !ring-transparent'
					/>
					<Button variant='outline' size='icon' className='w-8 h-8 min-w-8'>
						<MagnifyingGlassIcon className='size-4' />
					</Button>
				</div>
				{contacts.length != 0 ? (
					<ScrollArea>
						{contacts.map((contact, index) => (
							<div
								className={`rounded-xl text-sm py-2 px-3 cursor-pointer flex justify-between items-center border ${
									selectedContactId == contact.id
										? ''
										: 'border-transparent hover:bg-slate-50'
								}`}
								key={index}
								onClick={() => setSelectedContactId(contact.id)}
							>
								<p>{`${contact.firstName} ${contact.lastName}`}</p>
							</div>
						))}
						<div ref={ref}></div>
					</ScrollArea>
				) : (
					<p className='text-sm p-2 flex justify-between'>Список пуст</p>
				)}
			</aside>
		)
}
