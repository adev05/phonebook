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

import {
	useIntersectionObserver,
	useQuery,
	useField,
} from '@siberiacancode/reactuse'
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from './ui/pagination'

interface Contact {
	id: number
	firstName: string
	lastName: string
}

type Contacts = Contact[]

const LIMIT = 30

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
	const [page, setPage] = useState<number>(1)
	const [maxPage, setMaxPage] = useState<number>(1)
	const [contacts, setContacts] = useState<Contacts>([])
	const [sortBy, setSortBy] = useState('asc')
	const [search, setSearch] = useState('')

	const fetchData = async () => {
		const response = await fetch(
			`http://localhost:8080/api/contacts/findAll?limit=${LIMIT}&page=${page}&request=${search}`
		)
		const data = await response.json()

		if (!response.ok) {
			return
		}

		if (data.data.length) {
			// console.log('data is not null')
			setContacts(data.data)
			setMaxPage(data.count)
		} else {
			// console.log('data is null')
			setContacts([])
		}

		// console.log(
		// 	data,
		// 	contacts,
		// 	`http://localhost:8080/api/contacts/findAll?limit=${LIMIT}&page=${page}&request=${search}`
		// )
	}

	useEffect(() => {
		fetchData()
	}, [])

	useEffect(() => {
		fetchData()
	}, [page])

	useEffect(() => {
		if (page == 1) {
			fetchData()
		} else {
			setPage(1)
		}
	}, [search])

	function changeSortBy(value: string) {
		if (value != sortBy) {
			setContacts(contacts.reverse())
			setSortBy(value)
		}
	}

	function paginationPrevious() {
		if (page > 1) {
			setPage(prevPage => prevPage - 1)
		}
	}

	function paginationNext() {
		if (page < maxPage) {
			setPage(prevPage => prevPage + 1)
		}
	}

	return (
		<aside className='w-60 h-full flex flex-col gap-2'>
			<div className='flex justify-between items-center'>
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
									<DropdownMenuItem disabled>Добавить контакт</DropdownMenuItem>
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
			<div className='flex gap-2 items-center'>
				<Input
					placeholder='Поиск по контактам'
					className='w-full h-8 !ring-transparent'
					onChange={e => setSearch(e.target.value)}
					value={search}
				/>
			</div>
			{contacts.length != 0 ? (
				<>
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

						{/* {contacts.length > LIMIT ? <div ref={ref}></div> : <></>} */}
					</ScrollArea>
					<Pagination className='mt-auto'>
						<PaginationContent>
							<PaginationItem
								onClick={paginationPrevious}
								className={page == 1 ? 'invisible' : 'cursor-pointer'}
							>
								<PaginationPrevious />
							</PaginationItem>

							<PaginationItem>
								<PaginationLink isActive>{page}</PaginationLink>
							</PaginationItem>

							<PaginationItem
								onClick={paginationNext}
								className={page == maxPage ? 'invisible' : 'cursor-pointer'}
							>
								<PaginationNext />
							</PaginationItem>
						</PaginationContent>
					</Pagination>
				</>
			) : (
				<p className='text-sm p-2 flex justify-between'>Список пуст</p>
			)}
		</aside>
	)
}
