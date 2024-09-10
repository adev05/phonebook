'use client'

import { useDataContext } from '../../context/DataContext'

export default function Sidebar() {
	const { data, setSelectedPhoneNumber } = useDataContext()

	if (!data) return null

	return (
		<div className='flex flex-col h-full'>
			<h1 className='text-lg font-medium px-2 mb-2'>Контакты</h1>

			<div className='divide-y divide-slate-100 overflow-auto'>
				{data.map(contact => (
					<p
						className='text-sm p-2 cursor-pointer hover:bg-slate-50 rounded-xl flex justify-between'
						key={contact.id}
						onClick={() => setSelectedPhoneNumber(contact)}
					>
						{`${contact.person.first_name} ${contact.person.last_name}`}

						{contact.is_primary ? <span>☆</span> : ''}
					</p>
				))}
			</div>
		</div>
	)
}
