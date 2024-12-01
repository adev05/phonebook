import { makeAutoObservable } from 'mobx'

const DEBOUNCE_DELAY = 300

export class SearchStore {
	_query: string = ''
	_timer: NodeJS.Timeout | null = null

	constructor() {
		makeAutoObservable(this, {
			_timer: false,
		})
	}

	get query() {
		return this._query
	}

	setQuery(query: string, callback: (query: string) => void) {
		this._query = query

		if (this._timer) {
			clearTimeout(this._timer)
		}

		this._timer = setTimeout(() => {
			callback(query.trim())
		}, DEBOUNCE_DELAY)
	}

	reset() {
		this._query = ''
		if (this._timer) {
			clearTimeout(this._timer)
		}
	}
}
