'use client'

import './globals.css'
import { SidebarProvider } from '@/components/ui/sidebar'
import AppSidebar from '@/components/AppSidebar'
import React from 'react'
import { ThemeProvider } from 'next-themes'
import { Header } from '@/components/Header'

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body>
				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					enableSystem
					disableTransitionOnChange
				>
					<SidebarProvider>
						<AppSidebar />
						<div className='flex flex-col h-screen w-full'>
							<Header />
							<main className='flex-1 p-4'>{children}</main>
						</div>
					</SidebarProvider>
				</ThemeProvider>
			</body>
		</html>
	)
}
