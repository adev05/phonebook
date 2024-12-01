export const apiUrls = {
	baseUrl: 'http://localhost:8080/api',
	withBaseUrl: (url: string) => `${apiUrls.baseUrl}${url}`,
	contacts: {
		findAll: (limit: number | null, page: number, search: string | null) =>
			`/contacts/findAll?${limit && `limit=${limit}&`}&page=${page}&${
				search && `request=${search}`
			}`,
		findById: (id: string) => `/contacts/findById/${id}`,
		create: '/contacts/create',
		update: (id: number) => `/contacts/update/${id}`,
		delete: (id: number) => `/contacts/delete/${id}`,
	},
}
