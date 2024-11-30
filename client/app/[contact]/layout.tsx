'use client'

import AppSidebar from '@/components/AppSidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { ContactsStore } from '@/store/contactsStore'
import React from 'react'

export const ContactsContext = React.createContext<ContactsStore | null>(null)

export default function ContactLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<SidebarProvider>
			{/* <main className='container mx-auto overflow-hidden h-screen'>
				<div className='h-full flex divide-x'>{children}</div>
			</main> */}
			<ContactsContext.Provider value={new ContactsStore()}>
				<AppSidebar />
				<main>
					<SidebarTrigger />
					{children}
				</main>
			</ContactsContext.Provider>
		</SidebarProvider>
	)
}
