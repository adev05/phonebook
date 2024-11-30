export const apiUrls = {
	baseUrl: 'http://localhost:8080/api',
	withBaseUrl: (url: string) => `${apiUrls.baseUrl}${url}`,
	contacts: {
		findAll: (limit: number, page: number | null, search: string | null) =>
			`/contacts/findAll?${limit && `limit=${limit}&`}&${
				page && `page=${page}`
			}&${search && `request=${search}`}`,
	},
}
