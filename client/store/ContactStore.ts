import { Contact } from '@/types/Contact'
import { Meta } from '@/utils/meta'
import { makeAutoObservable, runInAction } from 'mobx'
import axios from 'axios'
import { apiUrls } from '@/config/apiUrls'
import { ContactsStore } from './ContactsStore'

export class ContactStore {
	_contact: Contact | null = null
	_meta: Meta = Meta.initial
	_isEditing: boolean = false
	_editedContact: Contact | null = null

	constructor(private contactsStore?: ContactsStore) {
		makeAutoObservable(this)
	}

	get contact() {
		return this._contact
	}

	get meta() {
		return this._meta
	}

	get isEditing() {
		return this._isEditing
	}

	get editedContact() {
		return this._editedContact
	}

	setIsEditing(value: boolean) {
		this._isEditing = value
		if (value && this._contact) {
			this._editedContact = { ...this._contact }
		} else {
			this._editedContact = null
		}
	}

	updateEditedContact(field: keyof Contact, value: string) {
		if (this._editedContact) {
			this._editedContact = {
				...this._editedContact,
				[field]: value,
			}
		}
	}

	async saveContact() {
		if (!this._editedContact) return

		this._meta = Meta.loading
		try {
			const response = await axios.put(
				apiUrls.withBaseUrl(apiUrls.contacts.update(this._editedContact.id)),
				this._editedContact
			)

			runInAction(() => {
				this._contact = response.data
				this._isEditing = false
				this._editedContact = null
				this._meta = Meta.success
				if (this.contactsStore) {
					this.contactsStore.updateContactInList(response.data)
				}
			})
		} catch (error) {
			runInAction(() => {
				this._meta = Meta.error
				console.error('Error updating contact:', error)
			})
		}
	}

	cancelEdit() {
		this._isEditing = false
		this._editedContact = null
	}

	async getContact(id: string) {
		if (this._meta == Meta.loading) return
		console.log('getContactById called')
		this._meta = Meta.loading
		try {
			const response = await axios(
				apiUrls.withBaseUrl(apiUrls.contacts.findById(id))
			)
			console.log(response.data)
			runInAction(() => {
				this._contact = response.data
				this._meta = Meta.success
			})
		} catch (error) {
			this._meta = Meta.error
			console.error(error)
		}
	}

	async deleteContact() {
		if (!this._contact) return

		this._meta = Meta.loading
		try {
			await axios.delete(
				apiUrls.withBaseUrl(apiUrls.contacts.delete(this._contact.id))
			)

			runInAction(() => {
				this._contact = null
				this._meta = Meta.success
			})

			return true
		} catch (error) {
			runInAction(() => {
				this._meta = Meta.error
				console.error('Error deleting contact:', error)
			})
			return false
		}
	}
}
