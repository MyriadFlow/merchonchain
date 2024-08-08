import Link from 'next/link'
import LeaderBoard from '@/components/leaderboard'
import Footer from '@/components/footer'

import { ConnectWallet } from '@/components/connect-wallet'

export default function Home() {
	return (
		<div className='bg-black'>
			<div
				className='px-10'
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					background:
						'linear-gradient(90deg, #FDF4F5, #00A9FF, #604CC3, #FF55BB)',
					paddingBottom: '10px',
				}}
			>
				<div className='mt-4'>
					<Link href='/'>
						<img src='/logo.png' style={{ width: '200px' }} alt='Logo' />
					</Link>
				</div>
				<div
					style={{
						display: 'flex',
						gap: '40px',
						fontSize: '20px',
						color: 'white',
					}}
					className='mt-6'
				>
					<Link href='https://myriadflow.com' target='_blank'>
						Home
					</Link>
					<Link href='https://discover-polygon.vercel.app/' target='_blank'>
						Discover
					</Link>
					<Link href='https://studio-polygon.vercel.app/' target='_blank'>
						Studio
					</Link>
					<Link href='https://webxr-polygon.vercel.app/' target='_blank'>
						WebXR
					</Link>
				</div>
				<div className='mt-6'>
					<ConnectWallet />
				</div>
			</div>
			<div className='flex h-screen bg-white'>
				<div className='w-1/2 h-full px-16 flex flex-col justify-center'>
					<div className='text-7xl font-bold'>WebXR</div>
					<div className='text-6xl font-semibold mt-6'>
						Experience & Interact
					</div>
					<div className='text-2xl mt-10'>
						Interact with unique AI-powered brand ambassadors.
					</div>
					<div className='flex gap-10 mt-10'>
						<ConnectWallet />
					</div>
				</div>

				<div
					className='w-1/2'
					style={{ marginTop: '200px', marginLeft: '50px' }}
				>
					<iframe
						width='560'
						height='315'
						src={`https://www.youtube.com/embed/5rMei4ShcHU?autoplay=1`}
						frameBorder='0'
						allow='accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
						allowFullScreen
					></iframe>
				</div>
			</div>

			<div className='pt-20 bg-white'>
				<LeaderBoard />
			</div>

			<div className='bg-white pt-20'>
				<Footer />
			</div>
		</div>
	)
}
