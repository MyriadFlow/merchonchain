'use client'
import React, { useEffect, useState } from 'react'
import Avatars from './avatars'

const Leaderboard = () => {
	const [avatar, setAvatar] = useState([])

	const getBrands = async () => {
		const baseUri = process.env.NEXT_PUBLIC_URI || 'https://app.myriadflow.com'

		// localStorage.setItem(
		// 	'PolygonCardonaChain',
		// 	'f0e4bdf6-2d6c-4c32-93d6-acf9ad5cdf44'
		// )
		// const chaintype = localStorage.getItem('PolygonCardonaChain')

		const avatar = await fetch(`${baseUri}/avatars/all`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})

		const avatardata = await avatar.json()
		// setAvatar(avatardata);
		setAvatar([...avatardata].reverse())
	}

	useEffect(() => {
		getBrands()
	}, [])

	return (
		<div>
			<div
				style={{
					backgroundColor: '#00000021',
					position: 'relative',
					marginTop: '0px',
				}}
			>
				<div
					className='text-center font-bold'
					style={{
						background:
							'linear-gradient(to right, #F45EC1 , #F45EC1 , #4EB9F3, #4EB9F3)',
						WebkitBackgroundClip: 'text',
						WebkitTextFillColor: 'transparent',
						backgroundColor: '#00000021',
						paddingTop: '20px',
						paddingBottom: '20px',
						textAlign: 'center',
						fontSize: '30px',
					}}
				>
					More than NFTs.
				</div>
			</div>

			{/* <div style={{ textAlign: 'center', fontSize: '40px', marginTop: '50px' }}>
				WebXR Xperiences live soon!
			</div> */}

			<div
				className='mt-10 flex'
				style={{ gap: '40px', flexWrap: 'wrap', justifyContent: 'center' }}
			>
				{avatar?.reverse().map((nft, index) => (
					<Avatars key={index} nft={nft} />
				))}
			</div>
		</div>
	)
}

export default Leaderboard
