import React from "react";
// import Footer from "../components/footer/footer";
// import Header2_0 from "../components/header/header2_0";
import Homepage_svg from "../assets/homepage_svg.svg"
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate=useNavigate()
  const Schedulepickup = () => {
    navigate("/schidule_pickup");}
    const trackPickup = ()=>{

      navigate("/track")
    }
  return (
    <div className="bg-white">
      {/* <Header2_0 /> */}

      {/* Main Section */}
      <div className="flex flex-wrap md:flex-nowrap items-center gap-36">
        {/* Left Section: Illustration */}
        <div className="w-1/3 h-1/3 flex justify-center m-28">
        <img src={Homepage_svg} alt="Signup Animation" />        
      </div>

        {/* Right Section: Card */}
        <div className="w-1/3 h-96 bg-[#F5F5FF] shadow-2xl shadow-main rounded-lg p-6">
          <h2 className="text-3xl font-bold text-black mb-4 text-center">
            Sell your recyclables <br />
            online
            <br />
            with Trash Cash!
          </h2>
          <div className="space-y-4">
            <button onClick={Schedulepickup}  className="w-full my-8 bg-[#d0d0d0] text-[#000000] py-2 rounded-md hover:bg-main hover:text-[#ffffff] transition">
              Schedule Pickup
            </button>
            <button onClick={trackPickup} className="w-full bg-[#d0d0d0] text-[#000000] py-2 rounded-md hover:bg-main hover:text-[#ffffff] transition">
              Check My Pickups
            </button>
          </div>
        </div>
      </div>

      {/* <Footer /> */}
    </div>
  );
}

export default HomePage;