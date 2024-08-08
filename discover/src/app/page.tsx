'use client'
import Image from 'next/image'
import Link from 'next/link'
import MostLoved from '../components/mostLoved'
import MostRecently from '../components/mostRecently'
import LeaderBoard from '../components/leaderboard'
import HotNFTs from '../components/hotNFTs'
import LatestNFTs from '../components/latestNFTs'
import Brand from '../components/brand'
import CreateBanner from '../components/createbanner'
import Header1 from '../components/header1'
import Footer from '../components/footer'
import { useEffect, useState } from 'react'

export default function Home() {
	const isDevelopment = process.env.NEXT_PUBLIC_NODE_ENV === 'development'

	const apiUrl = isDevelopment
		? 'http://localhost:3000' // Local development URL
		: 'https://discover.myriadflow.com' // Production URL

	// console.log("api url", apiUrl);

	const [brands, setBrands] = useState([]);
	const [phygitals, setPhygitals] = useState<any>([]);
	const [collections, setCollections] = useState<any>([]);
	const [loading, setLoading] = useState(false);

	const getBrands = async () => {
		try {
			setLoading(true);
		 //   const res = await fetch(`${apiUrl}/api/brands`);
		 //   const phyres = await fetch(`${apiUrl}/api/phygitals`);
		 //   const collres = await fetch(`${apiUrl}/api/collections`);

		  const baseUri = process.env.NEXT_PUBLIC_URI || 'https://app.myriadflow.com';

		  const res = await fetch(`${baseUri}/brands/all/554b4903-9a06-4031-98f4-48276c427f78`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
			});

			const phyres = await fetch(`${baseUri}/phygitals/all/554b4903-9a06-4031-98f4-48276c427f78`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
				});

				const collres = await fetch(`${baseUri}/collections/all/554b4903-9a06-4031-98f4-48276c427f78`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json'
					}
					});

		  
	  
		  if (!res.ok || !phyres.ok || !collres.ok) {
			throw new Error('Failed to fetch data');
		  }
	  
		  const result = await res.json();
		  const phyresult = await phyres.json();
		  const collresult = await collres.json();
	  
		  setBrands(result);
		  setPhygitals(phyresult);
		  setCollections(collresult);

		  setLoading(false);

		  console.log("new database output", result, phyresult, collresult);
		} catch (error) {
		  console.error('Error fetching data:', error);
		  setLoading(false);
		}
	  };

	useEffect(() => {
		getBrands()
	}, [])

	const exploreButtonStyle = {
		padding: '10px 40px',
		fontSize: '1rem',
		fontWeight: 'bold',
		color: 'white',
		border: 'none',
		borderRadius: '5px',
		cursor: 'pointer',
		backgroundImage: 'url("./Rectangle 12.png")',
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Optional: Add box-shadow for a better visual effect
	}

	return (
		<div className='bg-black'>
			<div
				className=''
				style={{ zIndex: 10, position: 'fixed', left: 0, right: 0 }}
			>
				<Header1 />
			</div>
			<div className='flex h-screen bg-white'>
				<div className='w-1/2 h-full px-16 flex flex-col justify-center'>
					<div className='text-7xl font-bold'>Discover</div>
					<div className='text-6xl font-semibold mt-6'>Phygital Xperience</div>
					<div className='text-6xl font-semibold mt-4'>with MyriadFlow</div>
					<div className='text-2xl mt-10'>
						Explore & launch brands and phygitals with a WebXR experience.
						Create & interact with AI-Powered brand ambassadors.
					</div>
					<div className='flex gap-10 mt-10'>
						<Link href="#movetotrends" style={exploreButtonStyle}>Explore</Link>
						<Link href="https://studio.myriadflow.com" target="_blank" style={exploreButtonStyle}>Launch</Link>
					</div>
				</div>

				<div
					className='w-1/2'
					style={{
						backgroundImage: 'url("./landing.png")',
						backgroundSize: 'cover',
						backgroundPosition: 'center',
						position: 'relative',
					}}
				>
					<img
						src='./image 4.png'
						alt='Top Left'
						style={{
							position: 'absolute',
							top: '100px',
							left: '40px',
							width: '280px',
							height: '280px',
						}}
					/>
					<img
						src='./image 6.png'
						alt='Top Right'
						style={{
							position: 'absolute',
							top: '100px',
							right: '40px',
							width: '280px',
							height: '280px',
						}}
					/>
					<img
						src='./image 8.png'
						alt='Bottom Left'
						style={{
							position: 'absolute',
							bottom: '40px',
							left: '40px',
							width: '280px',
							height: '280px',
						}}
					/>

					<img
						src='./image 7.png'
						alt='Overlay'
						style={{
							position: 'absolute',
							bottom: '40px',
							left: '40px',
							width: '280px',
							height: '300px',
							marginBottom: '20px',
						}}
					/>

					<img
						src='./image 5.png'
						alt='Bottom Right'
						style={{
							position: 'absolute',
							bottom: '40px',
							right: '40px',
							width: '280px',
							height: '280px',
						}}
					/>
				</div>
			</div>

			<div
				className='text-4xl font-bold py-6'
				style={{
					textAlign: 'center',
					backgroundImage:
						'linear-gradient(to right, #F45EC1 ,#F45EC1 , #F45EC1, #4EB9F3, #4EB9F3, #4EB9F3)',
					WebkitBackgroundClip: 'text',
					backgroundClip: 'text',
					color: 'transparent',
				}}
			>
				Beyond Real World Assets.
			</div>

			<div
				className='flex bg-white p-20'
				style={{
					// position: 'relative',
					width: '100%',
					height: 'auto',
					justifyContent: 'center',
				}}
			>
				<img
					src='./image 41.png'
					style={{
						// position: 'absolute',
						// left: '40px',
						zIndex: '1',
						width: '180px',
						height: 'auto',
						paddingBottom: '100px',
					}}
				/>
				<img
					src='./image 51.png'
					style={{
						// position: 'absolute',
						// left: 'calc(0px + 180px + 2px)',
						zIndex: '2',
						width: '180px',
						height: 'auto',
						paddingBottom: '100px',
					}}
				/>
				<img
					src='./2_small 1.png'
					style={{
						// position: 'absolute',
						// left: 'calc(0px + 360px - 30px)',
						zIndex: '3',
						width: '180px',
						height: 'auto',
						paddingBottom: '100px',
					}}
				/>
				<img
					src='./image 9.png'
					style={{
						// position: 'absolute',
						// left: 'calc(0px + 540px - 60px)',
						zIndex: '4',
						width: '180px',
						height: 'auto',
						paddingBottom: '100px',
					}}
				/>
				<img
					src='./image 10.png'
					style={{
						// position: 'absolute',
						// left: 'calc(0px + 720px - 80px)',
						zIndex: '5',
						width: '180px',
						height: 'auto',
						paddingBottom: '100px',
					}}
				/>
				<img
					src='./image 13.png'
					style={{
						// position: 'absolute',
						// left: 'calc(0px + 900px - 100px)',
						zIndex: '6',
						width: '180px',
						height: 'auto',
						paddingBottom: '100px',
					}}
				/>
				<img
					src='./image 11.png'
					style={{
						// position: 'absolute',
						// left: 'calc(0px + 1080px - 120px)',
						zIndex: '7',
						width: '180px',
						height: 'auto',
						paddingBottom: '100px',
					}}
				/>
				<img
					src='./image 14.png'
					style={{
						// position: 'absolute',
						// left: 'calc(0px + 1260px - 140px)',
						zIndex: '8',
						width: '180px',
						height: 'auto',
						paddingBottom: '100px',
					}}
				/>
			</div>

			<div className='pt-10 bg-white px-10'>
				<MostLoved collectionsdata={collections}/>
			</div>

			<div className='pt-40 bg-white px-10'>
				{/* <MostRecently collectionsdata={collections}/> */}
				<LatestNFTs hotnftdata={phygitals}/>
			</div>

			<div className='pt-40 bg-white'>
				<LeaderBoard />
			</div>

			<div className='pt-40 bg-white px-10'>
				<HotNFTs hotnftdata={phygitals}/>
			</div>

			<div className='pt-40 bg-white px-10'>
				<Brand brandsdata={brands}/>
			</div>

			<div className='bg-white'>
				<CreateBanner />
			</div>

			<div className='bg-white pt-20'>
				<Footer />
			</div>


			{loading && (
  <div
    style={{
    //   backgroundColor: "#222944E5",
      display: "flex",
      overflowY: "auto",
      overflowX: "hidden",
      position: "fixed",
      inset: 0,
      zIndex: 50,
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      maxHeight: "100%",
    }}
    id="popupmodal"
  >
    <div style={{ position: "relative", padding: "1rem", width: "100%", maxHeight: "100%" }}>
      <div style={{ position: "relative"}}>
        <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
          <img
            src="https://i.pinimg.com/originals/36/3c/2e/363c2ec45f7668e82807a0c053d1e1d0.gif"
            alt="Loading icon"
          />
        </div>
      </div>
    </div>
  </div>
)}

		</div>
	)
}
