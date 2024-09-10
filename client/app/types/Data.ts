export interface Contact {
	id: number
	phone_number: string
	is_primary: boolean
	createdAt: string
	updatedAt: string
	person_id: number
	person: Person
}

export interface Person {
	id: number
	first_name: string
	last_name: string
	middle_name: string | null
	birth_date: string
	email: string
	createdAt: string
	updatedAt: string
	address_id: number
	address: Address
}

export interface Address {
	id: number
	city: string
	street: string
	house_number: number
	apartment_number: number
	createdAt: string
	updatedAt: string
}

export type Data = Contact[]
