'use client'

import { XMarkIcon } from '@heroicons/react/20/solid'
import { Input } from './ui/input'
import React from 'react'
import { observer } from 'mobx-react-lite'
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from './ui/sidebar'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ContactsStore } from '@/store/ContactsStore'
import InfiniteScroll from 'react-infinite-scroll-component'
import { SearchStore } from '@/store/SearchStore'
import ContactsSkeleton from './ContactsSkeleton'

const AppSidebar: React.FC = observer(() => {
	const params = useParams()
	const contactId = params.contact as string
	const contactsStore = React.useMemo(() => new ContactsStore(), [])
	const searchStore = React.useMemo(() => new SearchStore(), [])

	React.useEffect(() => {
		contactsStore.getContacts()
	}, [contactsStore])

	const handleSearch = React.useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			searchStore.setQuery(e.target.value, query => {
				if (query) {
					contactsStore.setSearchQuery(query)
				} else {
					contactsStore.reset()
				}
			})
		},
		[searchStore, contactsStore]
	)

	return (
		<Sidebar>
			<SidebarHeader>
				<div className='relative'>
					<Input
						placeholder='Поиск'
						value={searchStore.query}
						onChange={handleSearch}
						className='pr-8'
					/>
					{searchStore.query && (
						<button
							onClick={() =>
								searchStore.setQuery('', query => {
									if (contactsStore) {
										contactsStore.setSearchQuery(query)
									}
								})
							}
							className='absolute inset-y-0 right-0 flex items-center pr-2 hover:opacity-70'
						>
							<XMarkIcon className='h-4 w-4 text-muted-foreground' />
						</button>
					)}
				</div>
			</SidebarHeader>
			<SidebarContent id='sidebar-content'>
				<SidebarGroup>
					<SidebarMenu>
						<InfiniteScroll
							dataLength={contactsStore.list.length}
							next={() => contactsStore.getContacts()}
							hasMore={contactsStore.hasMore}
							loader={<ContactsSkeleton />}
							endMessage={<></>}
							scrollableTarget='sidebar-content'
						>
							{contactsStore.list.map(item => (
								<SidebarMenuItem key={item.id}>
									<SidebarMenuButton
										asChild
										isActive={item.id == Number(contactId)}
									>
										<Link
											href={String(item.id)}
										>{`${item.firstName} ${item.lastName}`}</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</InfiniteScroll>
					</SidebarMenu>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<SidebarGroupLabel>{contactsStore.count} контактов</SidebarGroupLabel>
			</SidebarFooter>
		</Sidebar>
	)
})

export default AppSidebar
