import { Card } from './ui/card'
import { Skeleton } from './ui/skeleton'

const ContactSkeleton: React.FC = () => {
	return (
		<div className='h-full flex flex-col'>
			<div className='flex justify-between items-center p-4 border-b'>
				<div className='flex gap-2'>
					<Skeleton className='h-9 w-[130px]' />
					<Skeleton className='h-9 w-[85px]' />
				</div>
			</div>

			<div className='flex-1 p-8 overflow-auto'>
				<div className='max-w-2xl mx-auto space-y-8'>
					<div className='flex flex-col items-center space-y-4'>
						<Skeleton className='h-32 w-32 rounded-full' />
						<Skeleton className='h-8 w-48' />
					</div>

					<div className='space-y-4'>
						<Card className='p-4'>
							<div className='flex items-center gap-3'>
								<Skeleton className='h-5 w-5' />
								<div className='flex-1'>
									<Skeleton className='h-4 w-16 mb-2' />
									<Skeleton className='h-5 w-32' />
								</div>
							</div>
						</Card>

						<Card className='p-4'>
							<div className='flex items-center gap-3'>
								<Skeleton className='h-5 w-5' />
								<div className='flex-1'>
									<Skeleton className='h-4 w-16 mb-2' />
									<Skeleton className='h-5 w-full' />
								</div>
							</div>
						</Card>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ContactSkeleton
