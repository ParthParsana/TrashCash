import React from "react";
import { useNavigate } from "react-router-dom";
import trashImage from "../assets/trash2.png";

export default function TbbDetails() {
  const navigate = useNavigate();

  const handlePickup = () => {
    navigate("/trash_before_burn");
  };

  return (
    <div
      className="relative min-h-screen flex items-start justify-center text-white pt-12"
      style={{
        background: `url(${trashImage}) no-repeat center center/cover`,
        position: "relative",
        opacity: 0.7,
      }}
    >
      {/* Content Section */}
      <div className="relative z-10 text-center px-6 max-w-2xl mt-[-20px]">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 drop-shadow-lg">
          Trash Before Burn
        </h1>
        <p className="text-lg md:text-xl mt-4 text-gray-800 leading-relaxed">
          A <strong>completely free</strong> garbage collection service that helps keep{" "}
          <strong>public places clean</strong>. We collect trash like{" "}
          <strong>leaves, plastic, and other waste materials</strong> from roads and parks.
        </p>
        <p className="mt-3 text-lg font-semibold text-green-700">
          ♻️ Let's make our city cleaner together! 🌍
        </p>

        {/* Schedule Button */}
        <button
          className=" px-8 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-orange-500 hover:to-yellow-400 text-white text-lg font-semibold rounded-full shadow-xl animate-pulse transition-transform duration-300 transform hover:scale-105"
          onClick={handlePickup}
        >
          🚛 Schedule a Pickup
        </button>
      </div>
    </div>
  );
}
