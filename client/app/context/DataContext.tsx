'use client'

import { createContext, useContext, useState } from 'react'
import { Data, Contact } from '../types/Data'

interface DataContextType {
	data: Data | null
	selectedPhoneNumber: Contact | null
	setSelectedPhoneNumber: (phoneNumber: Contact | null) => void
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export function useDataContext() {
	const context = useContext(DataContext)
	if (!context) {
		throw new Error('useDataContext must be used within a DataProvider')
	}
	return context
}

export function DataProvider({
	children,
	data,
}: {
	children: React.ReactNode
	data: Data | null
}) {
	const [selectedPhoneNumber, setSelectedPhoneNumber] =
		useState<Contact | null>(null)

	return (
		<DataContext.Provider
			value={{ data, selectedPhoneNumber, setSelectedPhoneNumber }}
		>
			{children}
		</DataContext.Provider>
	)
}
