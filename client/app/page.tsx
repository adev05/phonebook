'use client'

import { useEffect, useState } from 'react'
import Contact from '../components/contact'
import Sidebar from '../components/sidebar'

export default function Home() {
	const [selectedContactId, setSelectedContactId] = useState<
		number | undefined
	>()

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				setSelectedContactId(undefined)
			}
		}

		window.addEventListener('keydown', handleKeyDown)

		return () => {
			window.removeEventListener('keydown', handleKeyDown)
		}
	}, [])

	return (
		<main className='container mx-auto overflow-hidden h-screen'>
			<div className='py-4 h-full flex gap-2'>
				<Sidebar
					selectedContactId={selectedContactId}
					setSelectedContactId={setSelectedContactId}
				/>
				<Contact selectedContactId={selectedContactId} />
			</div>
		</main>
	)
}
