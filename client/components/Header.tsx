import { Sidebar } from 'lucide-react'
import { ModeToggle } from './mode-toggle'
import { SidebarTrigger } from './ui/sidebar'
import { Input } from './ui/input'

export function Header() {
	return (
		<div className='h-12 flex items-center justify-between px-2 bg-sidebar border-b gap-2'>
			<SidebarTrigger />
			{/* <Input placeholder='Поиск' /> */}
			<ModeToggle />
		</div>
	)
}
