import { Contact } from '@/types/Contact'
import { Meta } from '@/utils/meta'
import { makeAutoObservable, runInAction } from 'mobx'
import axios from 'axios'
import { apiUrls } from '@/config/apiUrls'

const LIMIT = 30

export class ContactsStore {
	_list: Contact[] = []
	_meta: Meta = Meta.initial
	contact_id: number | null = null

	constructor() {
		makeAutoObservable(this)
	}

	get list() {
		return this._list
	}

	get meta() {
		return this._meta
	}

	setContactId(id: number | null) {
		this.contact_id = id
	}

	addContact(contact: Contact) {
		this._list.push(contact)
	}

	async getContacts() {
		console.log('getContacts called')
		if (this._meta == Meta.loading) return
		this._meta = Meta.loading
		try {
			const page = null
			const search = null
			const response = await axios(
				apiUrls.withBaseUrl(apiUrls.contacts.findAll(LIMIT, page, search))
			)

			console.log({ response })

			runInAction(() => {
				this._list = response.data.data
				this._meta = Meta.success
			})
		} catch (error) {
			this._meta = Meta.error
			console.error(error)
		}
	}
}
