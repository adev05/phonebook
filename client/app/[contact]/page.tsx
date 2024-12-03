'use client'

import { ContactStore } from '@/store/ContactStore'
import { Meta } from '@/utils/meta'
import { observer } from 'mobx-react-lite'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
	PhoneIcon,
	MapPinIcon,
	PencilIcon,
	TrashIcon,
} from '@heroicons/react/24/outline'
import ContactSkeleton from '@/components/ContactSkeleton'
import { Input } from '@/components/ui/input'
import { ArrowLeftIcon } from '@heroicons/react/20/solid'

const ContactPage = observer(() => {
	const router = useRouter()
	const params = useParams()
	const contactId = params.contact as string
	const contactStore = React.useMemo(() => new ContactStore(), [])

	React.useEffect(() => {
		if (contactId) {
			contactStore.getContact(contactId)
		}
	}, [contactId])

	React.useEffect(() => {
		const handleEsc = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				router.push('/')
			}
		}

		window.addEventListener('keydown', handleEsc)

		return () => {
			window.removeEventListener('keydown', handleEsc)
		}
	}, [router])

	const handleDelete = async () => {
		const success = await contactStore.deleteContact()
		if (success) {
			router.push('/')
		}
	}

	if (
		contactStore.meta === Meta.loading ||
		contactStore.meta === Meta.initial
	) {
		return <ContactSkeleton />
	}

	if (!contactStore.contact) {
		return (
			<div className='flex items-center justify-center h-full'>
				Контакт не найден
			</div>
		)
	}

	const contact = contactStore.isEditing
		? contactStore.editedContact!
		: contactStore.contact

	return (
		<div className='flex flex-col'>
			<div className='flex justify-between items-center p-4 border-b'>
				<div className='w-full flex items-center gap-4'>
					{contactStore.isEditing ? (
						<>
							<Button
								variant='outline'
								onClick={() => contactStore.cancelEdit()}
							>
								Отмена
							</Button>
							<Button onClick={() => contactStore.saveContact()}>
								Сохранить
							</Button>
						</>
					) : (
						<div className='w-full flex gap-2'>
							<Button
								variant='outline'
								onClick={() => router.push('/')}
								className='mr-auto'
							>
								<ArrowLeftIcon className='h-4 w-4' />
								Назад
							</Button>
							<Button
								variant='outline'
								onClick={() => contactStore.setIsEditing(true)}
							>
								<PencilIcon className='h-4 w-4' />
								Редактировать
							</Button>
							<Button variant='destructive' onClick={handleDelete}>
								<TrashIcon className='h-4 w-4' />
								Удалить
							</Button>
						</div>
					)}
				</div>
			</div>

			<div className='flex-1 p-8 overflow-auto'>
				<div className='max-w-2xl mx-auto space-y-8'>
					<div className='flex flex-col items-center space-y-4'>
						<Avatar className='h-32 w-32'>
							<AvatarFallback className='text-3xl'>
								{contact.firstName[0]}
								{contact.lastName[0]}
							</AvatarFallback>
						</Avatar>
						{contactStore.isEditing ? (
							<div className='space-y-2 w-full max-w-sm'>
								<Input
									value={contact.lastName}
									onChange={e =>
										contactStore.updateEditedContact('lastName', e.target.value)
									}
									placeholder='Фамилия'
								/>
								<Input
									value={contact.firstName}
									onChange={e =>
										contactStore.updateEditedContact(
											'firstName',
											e.target.value
										)
									}
									placeholder='Имя'
								/>
								<Input
									value={contact.middleName}
									onChange={e =>
										contactStore.updateEditedContact(
											'middleName',
											e.target.value
										)
									}
									placeholder='Отчество'
								/>
							</div>
						) : (
							<h1 className='text-2xl font-semibold'>
								{contact.lastName} {contact.firstName} {contact.middleName}
							</h1>
						)}
					</div>

					<div className='space-y-4'>
						<Card className='p-4'>
							<div className='flex items-center gap-3'>
								<PhoneIcon className='h-5 w-5 text-muted-foreground' />
								<div>
									<div className='text-sm text-muted-foreground'>телефон</div>
									{contactStore.isEditing ? (
										<Input
											value={contact.phone}
											onChange={e =>
												contactStore.updateEditedContact(
													'phone',
													e.target.value
												)
											}
											placeholder='Телефон'
										/>
									) : (
										<div>{contact.phone}</div>
									)}
								</div>
							</div>
						</Card>

						<Card className='p-4'>
							<div className='flex items-center gap-3'>
								<MapPinIcon className='h-5 w-5 text-muted-foreground' />
								<div className='flex-1'>
									<div className='text-sm text-muted-foreground'>адрес</div>
									{contactStore.isEditing ? (
										<div className='space-y-2'>
											<Input
												value={contact.street}
												onChange={e =>
													contactStore.updateEditedContact(
														'street',
														e.target.value
													)
												}
												placeholder='Улица'
											/>
											<div className='flex gap-2'>
												<Input
													value={contact.house}
													onChange={e =>
														contactStore.updateEditedContact(
															'house',
															e.target.value
														)
													}
													placeholder='Дом'
												/>
												<Input
													value={contact.corpus}
													onChange={e =>
														contactStore.updateEditedContact(
															'corpus',
															e.target.value
														)
													}
													placeholder='Корпус'
												/>
												<Input
													value={contact.flat.toString()}
													onChange={e =>
														contactStore.updateEditedContact(
															'flat',
															e.target.value
														)
													}
													placeholder='Квартира'
												/>
											</div>
										</div>
									) : (
										<div>
											{contact.street}, {contact.house}
											{contact.corpus ? `, корп. ${contact.corpus}` : ''}
											{`, кв. ${contact.flat}`}
										</div>
									)}
								</div>
							</div>
						</Card>
					</div>
				</div>
			</div>
		</div>
	)
})

export default ContactPage
