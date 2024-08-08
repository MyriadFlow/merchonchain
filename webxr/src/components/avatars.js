'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Avatar } from '@readyplayerme/visage'

const HotNftCard = ({ nft }) => {
	return (
		<div style={{ position: 'relative', display: 'inline-block' }}>
			<Link href={`https://webxr-polygon.vercel.app/${nft.phygital_id}`}>
				<div
					style={{
						width: '330px',
						borderRadius: '30px',
						boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
						overflow: 'hidden',
						cursor: 'pointer',
					}}
				>
					<Avatar modelSrc={nft?.url} cameraInitialDistance={0.5} />
				</div>
			</Link>
		</div>
	)
}

export default HotNftCard
