'use client'
import React, { useState, useEffect } from 'react'
import HotNftCard from './hotNftCard'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'

const LatestNFTs = ({ hotnftdata }) => {

  const [loading, setLoading] = useState(false)

	// useEffect(() => {
	//   setLoading(true);
	//   const fetchData = async () => {

	//       try {

	//         const projectlink = process.env.NEXT_PUBLIC_SUPABASE_URL;
	//         const anonkey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

	//         const supabase = createClient(projectlink, anonkey);

	//         const { data: selectdata } = await supabase.from("manager").select();

	//         console.log("inseted data", selectdata);

	//         // setCreatedGames(selectdata);
	//         } catch (error) {
	//           console.error('Error fetching reviews:', error);
	//         }
	//       }

	//   const fetchReviewsData = async () => {
	//     await fetchData();
	//   };

	//   fetchReviewsData().finally(() => setLoading(false));
	// }, []);

	const modifiedNftData = [...hotnftdata];
if (modifiedNftData.length > 1) {
  const secondLastItem = modifiedNftData.splice(modifiedNftData.length - 2, 1)[0];
  modifiedNftData.push(secondLastItem);
}

	return (
		<div>
			<div className='font-semibold' style={{ color: '#DF1FDD' }}>
            Most Recently Launched
			</div>
			<div className='font-bold text-black text-6xl mt-10'>New on Discover</div>
			<div
				className='flex justify-between text-2xl'
				style={{ justifyContent: 'space-between' }}
			>
				<div className='mt-4'>
                New Frontier: Be Among the First to Discover the Newest Phygitals Making Their Debut!
				</div>
				<Link href="/newphygitals" className="border"
        style={{
          background: "transparent",
          border: "6px solid transparent",
          borderRadius: "8px",
          backgroundImage: `
    linear-gradient(white, white),
    linear-gradient(to right, #AF40FF, #5B42F3, #00DDEB)
  `,
          backgroundOrigin: "border-box",
          backgroundClip: "content-box, border-box",
          WebkitBackgroundClip: "content-box, border-box", // For Safari
          display: "block",
          width: "180px",
          height: "50px",
          textAlign:'center',
        }}
        >
          <div style={{marginTop: '4px'}}>View All</div></Link>
			</div>

			<div className='mt-10 flex' style={{ gap: '20px', flexWrap: 'wrap', justifyContent:'center' }}>
			{hotnftdata
  ?.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
  .slice(0, 8)
  .map((nft, index) => (
    <HotNftCard key={index} nft={nft} />
  ))}
      </div>

		</div>
	)
}

export default LatestNFTs;
