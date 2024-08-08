"use client"
import React, {useState, useEffect} from 'react'
import Link from 'next/link';
import { toast, ToastContainer } from 'react-toastify'
import { useAccount } from 'wagmi'

const Header1 = () => {

  const [isScrolled, setIsScrolled] = useState(false);
  const account = useAccount()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const Notification = () => {
    if (!account.address) {
      toast.warning("Currently works with Metamask and Coinbase Wallet Extension. We are working on Smart Wallet functionality.", {
        containerId: "containerA",
        position: 'top-left',
      }
      )
    }
  }

  return (
    <>
    <div className="px-10"
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      background: isScrolled ? 'black' : 'transparent',
      transition: 'background 0.3s ease-in-out',
      color: isScrolled ? 'white' : 'black',
        paddingBottom: '10px'
    }}>
        <div className='mt-4'>
          <a href="/">
            <img src={isScrolled ? "/logo2.png" : "/logo.png"} 
            style={{width:'200px'}}/>
            </a>
        </div>
        <div style={{display:'flex', gap:'40px', fontSize:'20px'}} className="font-bold mt-10">
<Link href="https://myriadflow.com" target="_blank">Home</Link>
<Link href="/#movetotrends">Explore</Link>
<Link href="/collections">Collections</Link>
<Link href="/brands">Brands</Link>
<Link href="/profile">Dashboard</Link>
        </div>
        <div className="mt-10">
            {/* <button className="px-10 mt-10" style={{paddingTop:'5px', paddingBottom:'5px', borderRadius:'5px',
              background: isScrolled ? 'white' : 'black',
              color: isScrolled ? 'black' : 'white',
            }}>Connect</button> */}
            <div onClick={() => Notification()}>
            <w3m-button />
          </div>
        </div>
    </div>
    <ToastContainer className="absolute top-0 right-0 " containerId="containerA" />
    </>
  )
}

export default Header1