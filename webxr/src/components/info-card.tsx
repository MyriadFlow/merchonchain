import Image from 'next/image'
import Link from 'next/link'

export const InfoCard = ({ phygital }: any) => {
	const removePrefix = (uri: any) => {
		return uri?.substring(7, uri.length)
	}

	function truncateString(str: string, length: number = 90): string {
		if (str?.length <= length) {
			return str
		}
		return str?.slice(0, length) + '...'
	}

	return (
		<div className='p-8 bg-white bg-opacity-40 backdrop-filter backdrop-blur-sm rounded-lg w-80'>
			<h2 className='font-bold mb-2'>
				NetSepio ÐWi-FI Launch Party: A Night of Futuristic Innovation
			</h2>
			<div className='flex items-center gap-8'>
				<div>
					<h3>Merchandise:</h3>
					<h3 className='mt-1'>{phygital ? phygital.name : 'Phygital name'}</h3>
				</div>
				<Image
					src={`${'https://nftstorage.link/ipfs'}/${removePrefix(
						phygital.image
					)}`}
					// src={'/Vector.png'}
					alt='placeholder'
					height={80}
					width={80}
				/>
			</div>
			<div>
				<div className=''>
					<p className='text-ellipsis'>
						{!phygital.description
							? 'loading'
							: truncateString(phygital?.description)}
					</p>
				</div>

				<div className='flex gap-4 mt-4'>
					<h3>By:</h3>
					<p>{phygital.brand_name}</p>
				</div>
			</div>
			<Link
				href='https://token-fest-polygon.vercel.app/events/info'
				target='_blank'
				rel='noopener noreferrer'
			>
				<button className=' py-3 bg-[#30D8FF] rounded-lg mt-4 mx-auto w-full'>
					View Event
				</button>
			</Link>
		</div>
	)
}
