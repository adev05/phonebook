'use client'

import { DataProvider } from '../context/DataContext'
import Sidebar from '@/app/components/sidebar/page'
import useFetchData from '../hooks/useFetchData'

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const { data, loading, error } = useFetchData(
		'http://localhost:8080/api/contacts/findAll'
	)

	if (loading) return <div>Loading</div>
	if (error) return <div>Error: {error}</div>

	return (
		<DataProvider data={data}>
			<main className='container mx-auto overflow-hidden'>
				<div className='flex h-screen flex-col md:flex-row gap-4 py-4'>
					<div className='w-full h-full md:w-64'>
						<Sidebar />
					</div>
					<div className='w-full'>{children}</div>
				</div>
			</main>
		</DataProvider>
	)
}
