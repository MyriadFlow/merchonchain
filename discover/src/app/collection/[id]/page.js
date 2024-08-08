"use client"
import React, {useState, useEffect} from 'react'
import Link from 'next/link';
import HotNftCard from "../../../components/hotNftCard";
import Header1 from '../../../components/header1'
import Footer from '../../../components/footer'

const Collection = ({params}) => {

    const id = params?.id;

    const [phygitals, setPhygitals] = useState([]);
    const [collections, setcollections] = useState([]);
    const [loading, setloading] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [desc, setdesc] = useState("");
    const [name, setname] = useState("");
    const [brandid, setbrandid] = useState("");
    const [logo, setLogos] = useState("");

    useEffect(() => {
        const brandmatch = async() => {
          setloading(true);
         const baseUri = process.env.NEXT_PUBLIC_URI || 'https://app.myriadflow.com';
     
     try {
       const res = await fetch(`${baseUri}/collections/all/554b4903-9a06-4031-98f4-48276c427f78`, {
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

       const brands = await fetch(`${baseUri}/brands/all/554b4903-9a06-4031-98f4-48276c427f78`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
     
       if (!res.ok || !phyres.ok || !brands.ok) {
         throw new Error('Failed to fetch data');
       }
     
       const result = await res.json();
       const phygitals = await phyres.json();
       const branddata = await brands.json();
     
         // Find the corresponding brand in result
         const matchedBrand = result.find(coll => coll.id === id);
         if (matchedBrand) {
          setcollections(matchedBrand);
         }

         // Filter collections by the brand id
  const matchedCollections = phygitals.filter(phygitals => phygitals.collection_id === id);

  setPhygitals(matchedCollections);

  const matchedBrandlogo = branddata.find(brand => brand.id === matchedBrand.brand_id);
    if (matchedBrandlogo) {
      setLogos(matchedBrandlogo.logo_image);
      setdesc(matchedBrandlogo.description);
      setbrandid(matchedBrandlogo.id);
      setname(matchedBrandlogo.name);
    }

    
  setloading(false);
     
       console.log("brand", matchedBrand, matchedCollections, matchedBrandlogo);
     
     } catch (error) {
       console.error('Error fetching data:', error);
       setloading(false);
     }
        }
     
        brandmatch();
       }, [])

       
  return (
<>
<div
				className=''
				style={{ zIndex: 10, position: 'fixed', left: 0, right: 0 }}
			>
				<Header1 />
			</div>
<div style={{ position: "relative", textAlign: "center", paddingTop:'90px' }}>
      <img
        src={`${
          "https://nftstorage.link/ipfs"
        }/${collections?.cover_image?.slice(7)}`}
        alt={collections?.name}
        style={{
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
          height:'90vh',
          width:'100vw',
          objectFit: 'cover',
          transform: 'scale(1)',  // Zooms in the image
          objectPosition: 'center', 
        }}
      />

      <img
        src={`${
          "https://nftstorage.link/ipfs"
        }/${collections?.logo_image?.slice(7)}`}
        alt={collections?.name}
        style={{
          width: "350px",  // Adjust the width as needed
          borderRadius:'20px',
          position: "absolute",
          bottom: "20px",  // Adjust the offset from the bottom as needed
          left: "20px",  // Adjust the offset from the left as needed
        }}
      />
    </div>

    <div style={{marginLeft:'40px', marginRight: '40px', marginTop:'100px'}}>

    <div
        className="flex"
        style={{ justifyContent: "space-between" }}
      >
        <div className="font-bold text-black" style={{fontSize:'40px'}}>
      {collections?.name}
      </div>

      <Link href="/collections" className="border"
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
          <div style={{marginTop: '4px', fontSize: '20px'}}>SHARE</div></Link>

          </div>
      <div
        className="text-2xl flex"
        style={{ justifyContent: "space-between" }}
      >
        <div className="mt-4 w-1/2">
        {collections?.description}
        </div>

        <div className="mt-4 flex gap-10" style={{
                  position: "relative",
        }}>
          <div>Launched By: <br></br>{name}</div>
          <img
                src={`https://nftstorage.link/ipfs/${logo?.slice(7)}`}
                alt="New Icon"
                style={{
                  // top: "10px",
                  // left: "10px",
                  width: "150px",
                  height: "150px",
                  // borderRadius: '50px',
                  // zIndex: 1 // Ensure it's on top of the card
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              />

{isHovered && (
            <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              position: 'absolute',
              top: '40%', // Adjust position based on your design
              right: '5%',
              transform: 'translateX(-50%)',
              backgroundImage: 'linear-gradient(120deg, rgba(48, 216, 255, 0.8) 0%, rgba(194, 67, 254, 0.8), rgba(194, 67, 254, 0.8))',
              color: 'black',
              padding: '20px',
              border: '1px solid #ddd',
              borderRadius: '15px',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
              zIndex: 20,
              width: '300px',
              color: 'white'
          }}
            >
            {/* <div style={{display: 'flex', gap:'20px'}}>
                <img 
                src={`${"https://nftstorage.link/ipfs"}/${logo?.slice(7)}`}
            
            style={{width: '80px', borderRadius:'100px'}}/>
              </div> */}
              <div className="mt-4" style={{fontSize: '13px', marginBottom:'20px', lineHeight: '1.6'}}>{desc}</div>
              <Link href={`/brand/${brandid}`} style={{fontSize: '15px', border:'1px solid white', borderRadius:'30px', padding:'4px'}}>View brand page</Link>
            </div>
          )}
        </div>  
      </div>

      <div className="font-bold text-black text-4xl" style={{marginTop:'100px'}}>Phygitals</div>

        <div className='mt-10 flex' style={{ gap: '20px', flexWrap: 'wrap' }}>
        {phygitals?.map((nft, index) => (
          <HotNftCard key={index} nft={nft} />
        ))}
      </div>

    </div>

    <div className='pt-20'>
				<Footer />
			</div>


    {loading && (
  <div
    style={{
      // backgroundColor: "#222944E5",
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
      <div style={{ position: "relative", borderRadius: "0.5rem", boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)" }}>
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

    </>
  )
}

export default Collection;