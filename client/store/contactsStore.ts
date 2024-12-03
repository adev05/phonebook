import { Contact } from '@/types/Contact'
import { Meta } from '@/utils/meta'
import { makeAutoObservable, runInAction } from 'mobx'
import axios from 'axios'
import { apiUrls } from '@/config/apiUrls'

const LIMIT = 100

export class ContactsStore {
	_list: Contact[] = []
	_meta: Meta = Meta.initial
	_page: number = 1
	_count: number = 0
	_hasMore: boolean = true
	_searchQuery: string = ''

	constructor() {
		makeAutoObservable(this)
	}

	get list() {
		return this._list
	}

	get meta() {
		return this._meta
	}

	get count() {
		return this._count
	}

	get hasMore() {
		return this._hasMore
	}

	setSearchQuery(query: string) {
		this._searchQuery = query
		this._page = 1
		this._list = []
		this._hasMore = true
		this.getContacts()
	}

	updateContactInList(updatedContact: Contact) {
		const index = this._list.findIndex(
			contact => contact.id === updatedContact.id
		)
		if (index !== -1) {
			this._list[index] = updatedContact
		}
	}

	addContactToList(newContact: Contact) {
		this._list = [newContact, ...this._list]
		this._count += 1
	}

	async getContacts() {
		if (this._meta === Meta.loading || !this._hasMore) return

		this._meta = Meta.loading
		try {
			const response = await axios(
				apiUrls.withBaseUrl(
					apiUrls.contacts.findAll(LIMIT, this._page, this._searchQuery)
				)
			)

			runInAction(() => {
				if (this._page === 1) {
					this._list = response.data.data
				} else {
					this._list = [...this._list, ...response.data.data]
				}

				this._count = response.data.count
				this._hasMore = this._page * LIMIT <= this._count
				this._page += 1
				this._meta = Meta.success
			})
		} catch (error) {
			runInAction(() => {
				this._meta = Meta.error
				console.error('Error fetching contacts:', error)
			})
		}
	}

	reset() {
		this._searchQuery = ''
		this._page = 1
		this._list = []
		this._hasMore = true
		this.getContacts()
	}
}
