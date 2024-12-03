'use client'

import { ContactStore } from '@/store/ContactStore'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	ArrowLeftIcon,
	UserIcon,
	PhoneIcon,
	MapPinIcon,
	BuildingOfficeIcon,
	HomeIcon,
} from '@heroicons/react/24/outline'

type ValidationErrors = {
	[key in keyof typeof emptyContact]?: string
}

const emptyContact = {
	firstName: '',
	lastName: '',
	middleName: '',
	street: '',
	house: '',
	corpus: '',
	flat: 0,
	phone: '',
}

const NewContactPage = observer(() => {
	const router = useRouter()
	const contactStore = React.useMemo(() => new ContactStore(), [])
	const [contact, setContact] = React.useState(emptyContact)
	const [errors, setErrors] = React.useState<ValidationErrors>({})
	const [isSubmitting, setIsSubmitting] = React.useState(false)

	const validateForm = () => {
		const newErrors: ValidationErrors = {}

		// Проверка личных данных
		if (!contact.lastName.trim()) {
			newErrors.lastName = 'Фамилия обязательна'
		} else if (contact.lastName.length < 2) {
			newErrors.lastName = 'Фамилия должна содержать минимум 2 символа'
		}

		if (!contact.firstName.trim()) {
			newErrors.firstName = 'Имя обязательно'
		} else if (contact.firstName.length < 2) {
			newErrors.firstName = 'Имя должно содержать минимум 2 символа'
		}

		if (!contact.middleName.trim()) {
			newErrors.middleName = 'Отчество обязательно'
		} else if (contact.middleName.length < 2) {
			newErrors.middleName = 'Отчество должно содержать минимум 2 символа'
		}

		// Проверка телефона
		if (!contact.phone.trim()) {
			newErrors.phone = 'Телефон обязателен'
		} else if (!/^\+?[0-9]{11}$/.test(contact.phone.replace(/\D/g, ''))) {
			newErrors.phone = 'Неверный формат телефона'
		}

		// Проверка адреса
		if (!contact.street.trim()) {
			newErrors.street = 'Улица обязательна'
		}

		if (!contact.house.trim()) {
			newErrors.house = 'Номер дома обязателен'
		}

		if (!contact.corpus.trim()) {
			newErrors.corpus = 'Корпус обязателен'
		}

		if (contact.flat === 0) {
			newErrors.flat = 'Номер квартиры обязателен'
		} else if (contact.flat < 0) {
			newErrors.flat = 'Номер квартиры не может быть отрицательным'
		}

		setErrors(newErrors)
		return Object.keys(newErrors).length === 0
	}

	const handleChange = (field: keyof typeof contact, value: string) => {
		setContact(prev => ({
			...prev,
			[field]: field === 'flat' ? Number(value) : value,
		}))
		// Очищаем ошибку поля при изменении
		if (errors[field]) {
			setErrors(prev => ({ ...prev, [field]: undefined }))
		}
	}

	const handleSubmit = async () => {
		if (isSubmitting) return

		if (!validateForm()) {
			return
		}

		setIsSubmitting(true)
		try {
			const success = await contactStore.createContact(contact)
			if (success) {
				router.push('/')
			}
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<div className='flex flex-col'>
			<div className='flex justify-between items-center p-4 border-b'>
				<div className='w-full flex items-center gap-4'>
					<div className='w-full flex gap-2'>
						<Button
							variant='outline'
							onClick={() => router.push('/')}
							className='mr-auto'
						>
							<ArrowLeftIcon className='h-4 w-4' />
							Назад
						</Button>
						<Button onClick={handleSubmit} disabled={isSubmitting}>
							{isSubmitting ? 'Создание...' : 'Создать контакт'}
						</Button>
					</div>
				</div>
			</div>

			<div className='flex-1 p-8 overflow-auto'>
				<div className='max-w-2xl mx-auto space-y-8'>
					<Card className='p-6'>
						<h2 className='text-lg font-semibold mb-4 flex items-center gap-2'>
							<UserIcon className='h-5 w-5' />
							Личные данные
						</h2>
						<div className='space-y-4'>
							<div>
								<Label htmlFor='lastName'>Фамилия *</Label>
								<Input
									id='lastName'
									value={contact.lastName}
									onChange={e => handleChange('lastName', e.target.value)}
									placeholder='Введите фамилию'
									className={errors.lastName ? 'border-red-500' : ''}
								/>
								{errors.lastName && (
									<p className='text-sm text-red-500 mt-1'>{errors.lastName}</p>
								)}
							</div>
							<div>
								<Label htmlFor='firstName'>Имя *</Label>
								<Input
									id='firstName'
									value={contact.firstName}
									onChange={e => handleChange('firstName', e.target.value)}
									placeholder='Введите имя'
									className={errors.firstName ? 'border-red-500' : ''}
								/>
								{errors.firstName && (
									<p className='text-sm text-red-500 mt-1'>
										{errors.firstName}
									</p>
								)}
							</div>
							<div>
								<Label htmlFor='middleName'>Отчество *</Label>
								<Input
									id='middleName'
									value={contact.middleName}
									onChange={e => handleChange('middleName', e.target.value)}
									placeholder='Введите отчество'
									className={errors.middleName ? 'border-red-500' : ''}
								/>
								{errors.middleName && (
									<p className='text-sm text-red-500 mt-1'>
										{errors.middleName}
									</p>
								)}
							</div>
						</div>
					</Card>

					<Card className='p-6'>
						<h2 className='text-lg font-semibold mb-4 flex items-center gap-2'>
							<PhoneIcon className='h-5 w-5' />
							Контактные данные
						</h2>
						<div>
							<Label htmlFor='phone'>Номер телефона *</Label>
							<Input
								id='phone'
								value={contact.phone}
								onChange={e => handleChange('phone', e.target.value)}
								placeholder='Например: +79001234567'
								className={errors.phone ? 'border-red-500' : ''}
							/>
							{errors.phone && (
								<p className='text-sm text-red-500 mt-1'>{errors.phone}</p>
							)}
						</div>
					</Card>

					<Card className='p-6'>
						<h2 className='text-lg font-semibold mb-4 flex items-center gap-2'>
							<MapPinIcon className='h-5 w-5' />
							Адрес
						</h2>
						<div className='space-y-4'>
							<div>
								<Label htmlFor='street'>Улица *</Label>
								<div className='flex items-center gap-2'>
									<BuildingOfficeIcon className='h-4 w-4 text-muted-foreground' />
									<Input
										id='street'
										value={contact.street}
										onChange={e => handleChange('street', e.target.value)}
										placeholder='Введите название улицы'
										className={errors.street ? 'border-red-500' : ''}
									/>
								</div>
								{errors.street && (
									<p className='text-sm text-red-500 mt-1'>{errors.street}</p>
								)}
							</div>
							<div className='grid grid-cols-3 gap-2'>
								<div>
									<Label htmlFor='house'>Дом *</Label>
									<Input
										id='house'
										value={contact.house}
										onChange={e => handleChange('house', e.target.value)}
										placeholder='№'
										className={errors.house ? 'border-red-500' : ''}
									/>
									{errors.house && (
										<p className='text-sm text-red-500 mt-1'>{errors.house}</p>
									)}
								</div>
								<div>
									<Label htmlFor='corpus'>Корпус *</Label>
									<Input
										id='corpus'
										value={contact.corpus}
										onChange={e => handleChange('corpus', e.target.value)}
										placeholder='№'
										className={errors.corpus ? 'border-red-500' : ''}
									/>
									{errors.corpus && (
										<p className='text-sm text-red-500 mt-1'>{errors.corpus}</p>
									)}
								</div>
								<div>
									<Label htmlFor='flat'>Квартира *</Label>
									<Input
										id='flat'
										type='number'
										min='0'
										value={contact.flat.toString()}
										onChange={e => handleChange('flat', e.target.value)}
										placeholder='№'
										className={errors.flat ? 'border-red-500' : ''}
										onKeyDown={e => {
											if (e.key === '-') {
												e.preventDefault()
											}
										}}
									/>
									{errors.flat && (
										<p className='text-sm text-red-500 mt-1'>{errors.flat}</p>
									)}
								</div>
							</div>
						</div>
					</Card>
				</div>
			</div>
		</div>
	)
})

export default NewContactPage
