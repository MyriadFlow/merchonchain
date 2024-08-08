'use client'
import Link from 'next/link'
import { ClaimNftPopUp } from './claim-nft-popup'
import Image from 'next/image'
import { useAccount, useChainId } from 'wagmi'
import { ToastContainer, toast } from 'react-toastify'
import { simulateContract, writeContract } from '@wagmi/core'
import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { ConnectWallet } from './connect-wallet'
import reward from '@/lib/reward.json'
import { config } from '@/lib/wagmi'
import { NfcMintPopUp } from './nfc-mint-popup'

const baseUri = process.env.NEXT_PUBLIC_URI || 'https://app.myriadflow.com'

export const ClaimNft = ({ onClose, phygitalName, freeNft, brandName }) => {
	const [claimNft, setClaimNft] = useState(false)

	const account = useAccount()

	const handleClick = () => {
		onClose(false)
	}

	const createFanToken = async () => {
		console.log('running...')
		const abi = reward.abi

		const { request } = await simulateContract(config, {
			abi,
			address: '0x7Bc52aEd144B3262c17442e5223113C2f29a7033',
			functionName: 'mint',
			args: [1, `${account.address}`],
		})
		const hash = await writeContract(config, request)

		console.log(hash)
		if (hash) {
			setClaimNft(true)
		}
	}

	const removePrefix = (uri) => {
		return uri?.substring(7, uri.length)
	}

	return (
		<div>
			<ToastContainer />
			{!claimNft ? (
				<div
					style={{
						//   backgroundColor: "#FFFFFFB2",
						display: 'flex',
						overflowY: 'auto',
						overflowX: 'hidden',
						position: 'fixed',
						inset: 0,
						zIndex: 50,
						justifyContent: 'center',
						alignItems: 'center',
						width: '100%',
						maxHeight: 'fit-content',
					}}
					id='popupmodal'
				>
					<div
						style={{
							position: 'relative',
							padding: '16px',
							width: '100%',
							maxWidth: '50rem',
							maxHeight: '100%',
						}}
					>
						<div
							style={{
								position: 'relative',
								borderRadius: '0.5rem',
								boxShadow: '0 0.25rem 0.75rem rgba(0, 0, 0, 0.25)',
								color: 'black',
								background: 'white',
							}}
						>
							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'flex-end',
									padding: '16px',
									borderRadius: '20px',
									borderColor: '#4B5563',
								}}
							>
								<X
									color='#000'
									style={{ cursor: 'pointer' }}
									onClick={handleClick}
								/>
							</div>

							<div style={{ padding: '10px', spaceY: '10px' }}>
								<div
									style={{ display: 'flex', justifyContent: 'space-around' }}
								>
									<p
										style={{
											backgroundImage:
												'linear-gradient(90deg, #30D8FF, #5B0292)',
											WebkitBackgroundClip: 'text',
											backgroundClip: 'text',
											color: 'transparent',
											// paddingTop: "60px",
											fontSize: '2.5rem',
											textAlign: 'center',
											fontWeight: 'bold',
										}}
									>
										Congratulations!
									</p>
								</div>

								<div
									style={{ display: 'flex', justifyContent: 'space-around' }}
								>
									<img src='./trophy2.png' />

									<Image
										src={`${'https://nftstorage.link/ipfs'}/${removePrefix(
											freeNft
										)}`}
										alt='Free NFT Image'
										height={80}
										width={150}
										style={{ marginTop: '40px' }}
									/>
									<img src='./trophy1.png' />
								</div>

								<p
									style={{
										fontSize: '1.2rem',
										textAlign: 'center',
										padding: '40px',
									}}
								>
									You can buy the Phygital to show your support to {brandName}{' '}
									and get a chance to earn weekly rewards.
								</p>
							</div>
							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									paddingBottom: '60px',
								}}
							>
								<Link
									href=''
									type='button'
									style={{
										width: '30%',
										marginLeft: 'auto',
										marginRight: 'auto',
										color: 'black',
										focusRing: '4px',
										outline: 'none',
										borderRadius: '30rem',
										fontSize: '1.2rem',
										padding: '2px 0px',
										textAlign: 'center',
										backgroundColor: '#30D8FF',
									}}
									onClick={() => {
										if (!account.address) {
											toast.warning('Connect or Create a wallet')
										} else {
											createFanToken()
										}
									}}
								>
									Buy Phygital
								</Link>
							</div>
							<div
								style={{
									display: 'flex',
									justifyContent: 'center',
									paddingBottom: '.5rem',
									marginInline: 'auto',
								}}
							>
								{!account.address && <ConnectWallet />}
							</div>
						</div>
					</div>
				</div>
			) : (
				<NfcMintPopUp onClose={onClose} phygitalNameName={phygitalName} />
			)}
		</div>
	)
}
