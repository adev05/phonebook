'use client'

import './globals.css'
import { SidebarProvider } from '@/components/ui/sidebar'
import AppSidebar from '@/components/AppSidebar'
import React from 'react'
import { ThemeProvider } from 'next-themes'
import { Header } from '@/components/Header'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en' className={inter.className} suppressHydrationWarning>
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
							{children}
						</div>
					</SidebarProvider>
				</ThemeProvider>
			</body>
		</html>
	)
}
