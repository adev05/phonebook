'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
	PlusIcon,
	MagnifyingGlassIcon,
	UserGroupIcon,
	PhoneIcon,
	ArrowPathIcon,
} from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'

export default function Home() {
	const router = useRouter()

	const features = [
		{
			icon: <UserGroupIcon className='h-8 w-8' />,
			title: 'Управление контактами',
			description:
				'Создавайте, редактируйте и организуйте ваши контакты в одном месте',
		},
		{
			icon: <MagnifyingGlassIcon className='h-8 w-8' />,
			title: 'Быстрый поиск',
			description: 'Мгновенно находите нужные контакты с помощью умного поиска',
		},
		{
			icon: <PhoneIcon className='h-8 w-8' />,
			title: 'Подробная информация',
			description:
				'Храните всю важную контактную информацию: телефоны, адреса и многое другое',
		},
	]

	return (
		<div className='min-h-[calc(100svh-48px)] flex items-center justify-center p-4 sm:p-6'>
			<div className='flex flex-col items-center w-full max-w-4xl mx-auto'>
				<div className='text-center space-y-4 mb-8 px-4'>
					<h1 className='text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent'>
						Телефонная книга
					</h1>
					<p className='text-base sm:text-lg text-muted-foreground max-w-lg mx-auto'>
						Организуйте ваши контакты просто и эффективно
					</p>
					<Button
						onClick={() => router.push('/new')}
						size='lg'
						className='bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'
					>
						<PlusIcon className='h-5 w-5 mr-2' />
						Создать контакт
					</Button>
				</div>

				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full mb-8'>
					{features.map((feature, index) => (
						<Card
							key={index}
							className='p-4 sm:p-6 hover:shadow-lg transition-shadow duration-300'
						>
							<div className='flex flex-col items-center text-center gap-4 py-4'>
								<div className='mb-2 sm:mb-3 p-2 sm:p-3 rounded-full bg-purple-100 text-purple-600'>
									{feature.icon}
								</div>
								<h2 className='text-base sm:text-lg font-semibold'>
									{feature.title}
								</h2>
								<p className='text-sm text-muted-foreground'>
									{feature.description}
								</p>
							</div>
						</Card>
					))}
				</div>

				<Card className='p-4 sm:p-6 w-full mx-4'>
					<div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
						<div>
							<h2 className='text-lg sm:text-xl font-semibold mb-1'>
								Начните прямо сейчас
							</h2>
							<p className='text-sm text-muted-foreground'>
								Выберите контакт из списка слева или создайте новый
							</p>
						</div>
						<Button variant='outline' onClick={() => router.push('/new')}>
							<ArrowPathIcon className='h-5 w-5 mr-2' />
							Начать
						</Button>
					</div>
				</Card>
			</div>
		</div>
	)
}
