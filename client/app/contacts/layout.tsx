import Sidebar from '@/components/sidebar/page'

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<main className='container mx-auto overflow-hidden'>
			<div className='flex h-screen flex-col md:flex-row gap-4 py-4'>
				<div className='w-full h-full md:w-64'>
					<Sidebar />
				</div>
				<div className='w-full'>{children}</div>
			</div>
		</main>
	)
}
