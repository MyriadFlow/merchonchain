import React from "react";
import Link from "next/link";

const Brand = ({brandsdata}) => {

  // const recentBrands = brandsdata.slice(-3).reverse();

  // console.log("brands", brandsdata)

  return (
    <div>
      <div className="font-bold text-black text-6xl">
      Brand Champions{" "}
      </div>
      <div
        className="flex justify-between text-2xl"
        style={{ justifyContent: "space-between" }}
      >
        <div className="mt-4">
        Pushing the Boundaries of Innovation.
        </div>
        <Link href="/brands" className="border"
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

      <div className="flex text-2xl" style={{justifyContent: 'center', marginTop:'200px', paddingBottom:'200px',gap:'20px', flexWrap: 'wrap'}}>
      {brandsdata?.map((brand, index) => (
          <Link href={`/brand/${brand.id}`} key={index}>
          <div key={index} className="flex flex-col justify-center items-center">
            <img
              src={`${
                "https://nftstorage.link/ipfs"
              }/${brand.logo_image.slice(7)}`}
              alt={brand.name}
              style={{
                width: "250px",
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "10px",
                marginBottom: "20px",
              }}
            >
              {brand.name}
            </div>
          </div>
          </Link>
        ))}

      </div>
    </div>
  );
};

export default Brand;
