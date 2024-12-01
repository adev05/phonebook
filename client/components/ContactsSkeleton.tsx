import { Skeleton } from './ui/skeleton'

const ContactsSkeleton: React.FC = () => {
	return (
		<>
			{Array.from({ length: 100 }).map((_, index) => (
				<div key={index} className='px-4 py-2'>
					<Skeleton className='h-4 w-40' />
				</div>
			))}
		</>
	)
}

export default ContactsSkeleton
