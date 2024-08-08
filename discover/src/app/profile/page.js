// "use client"
// import { useEvmNativeBalance } from '@moralisweb3/next';
// import {useAccount, useChainId } from 'wagmi';
// import Moralis from 'moralis';
// import { useEffect, useState } from 'react';


// function HomePage(){
//     const account = useAccount();
//     const address = account.address;
//     const chainId = useChainId()

//     const [mintedNFTs, setmintedNFTs] = useState([]);
//     const [matchedNFTs, setmatchedNFTs] = useState([]);

//     const apikey = process.env.NEXT_PUBLIC_MORALIS_API_KEY;
//     console.log("addr", address, chainId, apikey);

//     const fetch = async() => {

//     try {
//       await Moralis.start({
//         apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY
//       });
    
//     //   const response = await Moralis.EvmApi.balance.getNativeBalance({
//     //     "chain": chainId,
//     //     "address": address
//     //   });

//       const assets = await Moralis.EvmApi.nft.getWalletNFTs({
//         "chain": chainId,
//         "format": "decimal",
//         "mediaItems": false,
//         "address": address
//       });

//       const collections = await Moralis.EvmApi.nft.getWalletNFTCollections({
//         "chain": chainId,
//         "address": address
//       });

//       const response = await Moralis.EvmApi.events.getContractEvents({
//         "chain": chainId,
//         "order": "DESC",
//         "topic": "0x328ff68d0e66694e405c9f8fc906a346b345aa1f87ec216eaa82f2c654d0d34a",
//         "address": "0x2FB88a490b12B5bb5fD22d73D4bCD4B2F888b94d",
//         "abi": {
//       "anonymous": false,
//       "inputs": [
//         {
//           "indexed": false,
//           "name": "currentIndex",
//           "type": "uint256",
//           "internal_type": "uint256"
//         },
//         {
//           "indexed": false,
//           "name": "quantity",
//           "type": "uint256",
//           "internal_type": "uint256"
//         },
//         {
//           "indexed": true,
//           "name": "creator",
//           "type": "address",
//           "internal_type": "address"
//         }
//       ],
//       "name": "PhygitalAAssetCreated",
//       "type": "event"
//     }
//       });
    
    
//       console.log("response", assets.raw, collections.raw, response.raw);

//       setmintedNFTs(assets.raw);
	  
// 		  // Match NFTs with Phygitals by name
//       const matched = mintedNFTs.filter(nft => 
//         phyresult.some(phygital => nft.name === phygital.name)
//       );

//       setmatchedNFTs(matched);
//       console.log("profile nfts", matched);

//     } catch (e) {
//       console.error(e);
//     }


//   }

//   fetch();


//   const getBrands = async () => {
// 		try {
// 			// setLoading(true);

// 		  const baseUri = process.env.NEXT_PUBLIC_URI || 'https://app.myriadflow.com';

// 			const phyres = await fetch(`${baseUri}/phygitals/all`, {
// 				method: 'GET',
// 				headers: {
// 					'Content-Type': 'application/json'
// 				}
// 				});
	  
// 		  if (!phyres.ok) {
// 			throw new Error('Failed to fetch data');
// 		  }
	  
// 		  const phyresult = await phyres.json();

//       console.log("profile nfts", phyresult);
	  
// 		  // Match NFTs with Phygitals by name
//       const matched = mintedNFTs.filter(nft => 
//         phyresult.some(phygital => nft.name === phygital.name)
//       );

//       setmatchedNFTs(matched);

// 		  // setLoading(false);

// 		  // console.log("profile nfts", matched);
// 		} catch (error) {
// 		  console.error('Error fetching data:', error);
// 		  // setLoading(false);
// 		}
// 	  };


//   useEffect(() => {

//     getBrands();

//   }, [mintedNFTs])
  

//     // const { data: nativeBalance } = useEvmNativeBalance({ address });

//     // console.log("balance", nativeBalance);
//     return (
//         <div>
//             <h3>Wallet: {address}</h3>
//             {/* <h3>Native Balance: {nativeBalance?.balance.ether} ETH</h3> */}
//         </div>
//     );
// }

// export default HomePage;




"use client"
import { useEffect, useState } from 'react';
import { useAccount, useChainId } from 'wagmi';
import Moralis from 'moralis';
import ProfileNftCard from '../../components/profileNftCard'
import Header1 from '../../components/header1'
import Footer from '../../components/footer'

function HomePage() {
  const { address } = useAccount();
  const chainId = useChainId();

  const [mintedNFTs, setMintedNFTs] = useState([]);
  const [matchedNFTs, setMatchedNFTs] = useState([]);

  const apikey = process.env.NEXT_PUBLIC_MORALIS_API_KEY;
  const baseUri = process.env.NEXT_PUBLIC_URI || 'https://app.myriadflow.com';

  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        await Moralis.start({ apiKey: apikey });

        const assets = await Moralis.EvmApi.nft.getWalletNFTs({
          chain: chainId,
          format: 'decimal',
          mediaItems: false,
          address: address
        });

        setMintedNFTs(assets.raw.result);
        console.log("NFTs:", assets.raw.result);
      } catch (e) {
        console.error(e);
      }
    };

    if (address && chainId) {
      fetchNFTs();
    }
  }, [address, chainId, apikey]);

  useEffect(() => {
    const fetchPhygitals = async () => {
      try {
        const phyres = await fetch(`${baseUri}/phygitals/all/554b4903-9a06-4031-98f4-48276c427f78`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!phyres.ok) {
          throw new Error('Failed to fetch data');
        }

        const phyresult = await phyres.json();
        console.log("Phygitals:", phyresult);

        const matched = phyresult.map(phygital => {
          const amountBought = mintedNFTs.reduce((count, nft) => {
            return count + (nft?.name === phygital.name ? 1 : 0);
          }, 0);

          return {
            ...phygital,
            amount_bought: amountBought
          };
        }).filter(phygital => phygital.amount_bought > 0);

        setMatchedNFTs(matched);
        console.log("Matched NFTs:", matched);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (mintedNFTs.length > 0) {
      fetchPhygitals();
    }
  }, [mintedNFTs, baseUri]);

  return (
    <>
      <div
				className=''
				style={{ zIndex: 10, position: 'fixed', left: 0, right: 0 }}
			>
				<Header1 />
			</div>
      <div style={{padding:'50px'}}>
        <h4 className='font-bold text-4xl' style={{marginTop:'100px'}}>Your Exclusive NFT Showcase</h4>
        <div className='mt-10 flex' style={{ gap: '20px', flexWrap: 'wrap' }}>
        {matchedNFTs?.map((nft, index) => (
          <ProfileNftCard key={index} nft={nft} />
        ))}
      </div>
      </div>

      <div className='pt-20'>
				<Footer />
			</div>
      </>
  );
}

export default HomePage;

