'use client'

import Contact from '@/components/contact'
import React from 'react'

const ContactPage = ({ params }: { params: { contactId: number } }) => {
	React.useEffect(() => {
		console.log('params has been changed!', params)
	}, [params])

	return (
		<>
			{/* <AppSidebar contactsStore={contactsStore} /> */}
			<Contact contactId={params.contactId} />
		</>
	)
}

export default ContactPage
