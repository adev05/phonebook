import { ModeToggle } from './mode-toggle'
import { SidebarTrigger } from './ui/sidebar'

export function Header() {
	return (
		<div className='h-12 flex items-center justify-between px-2 bg-sidebar border-b gap-2'>
			<SidebarTrigger />
			<ModeToggle />
		</div>
	)
}
