import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/footer/footer";
import Header from "./components/header/header";
import Landing from "./pages/landpage";
import SignupPage from "./pages/signup_page";
import Home from "./pages/Home_page";
import About from "./pages/about";
import Schidule_pickup from "./pages/schidule_pickup";
import Scrap_detail from "./pages/scrap_details";
import Trash_before_burn from "./pages/Trash_before_you_burn";
import Track from "./pages/track";
import Tbbdetails from "./pages/Tbbdetails";
import "./App.css";


function App() {
  return (
    <Router>
      <div className="bg-slate-50 font-sans">
        <Header />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/schidule_pickup" element={<Schidule_pickup />} />
          <Route path="/scrap_rate" element={<Scrap_detail />} />
          <Route path="/trash_before_burn" element={<Trash_before_burn />} />
          <Route path="/track" element={<Track />} />
          <Route path="/tbbdetails" element={<Tbbdetails />} />
        </Routes>
        {/* <MainSection />
        <CardSection /> */}
        <Footer />
      </div>
    </Router>
  );
}

// function MainSection() {
//   return (
//     <section className="mt-12 mx-11">
//       <div className="flex place-content-center py-16">
//         <h1 className="place-content-center font-sans font-normal text-5xl">
//           Turn Trash Into Cash!
//         </h1>
//       </div>
//       <div className="flex max-w-max mx-auto px-2 h-10 w-48 text-xl text-gray-600">
//         <button className="px-2 border-2 shadow-2xl hover:shadow-main border-main rounded-lg place-content-center hover:bg-main hover:text-[#E9EFEC] hover:border">
//           Get Started
//           <i className="fa-solid fa-arrow-right place-content-center px-2"></i>
//         </button>
//       </div>
//     </section>
//   );
// }

// function CardSection() {
//   return (
//     <section className="py-10">
//       <div className="flex flex-wrap justify-center gap-6 py-11 content-center items-center">
//         <div className="w-48 h-40 rounded-lg place-content-center text-[#E9EFEC] bg-main flex items-center justify-center shadow-2xl shadow-main">
//           <p className="text-center p-3">
//             Recycle <br />
//             Right, Earn <br />
//             Bright!
//           </p>
//         </div>
//         <div
//           className="bg-cover bg-center px-2 w-56 h-64 shadow-2xl shadow-black rounded-lg flex items-center justify-center"
//           style={{ backgroundImage: `url(${img1})` }}
//         ></div>
//         <div
//           className="bg-cover bg-center px-2 w-56 h-64 shadow-2xl shadow-black rounded-lg flex items-center justify-center"
//           style={{ backgroundImage: `url(${img2})` }}
//         ></div>
//         <div className="w-56 h-40 bg-gradient-to-r from-main via-green-700 to-main px-2 shadow-2xl shadow-main rounded-lg flex items-center justify-center text-[#E9EFEC]">
//           <p className="text-center p-3">
//             Give us Trash <br />
//             And <br />
//             Save Environment
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// }

export default App;
