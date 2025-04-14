import React, { useState } from "react";
import axios from "axios";
import { FaCheckCircle, FaHourglassHalf, FaShippingFast, FaBoxOpen } from "react-icons/fa";

const Track = () => {
  const [orderId, setOrderId] = useState("");
  const [orderStatus, setOrderStatus] = useState("");
  const [error, setError] = useState("");
  const [trackingActive, setTrackingActive] = useState(false);
  const [loading, setLoading] = useState(false);

  // Order status steps with icons
  const statusOptions = [
    { label: "Pending", icon: <FaHourglassHalf className="text-yellow-500 text-2xl" /> },
    { label: "Order Confirmed", icon: <FaCheckCircle className="text-blue-500 text-2xl" /> },
    { label: "Out for Pick-up", icon: <FaShippingFast className="text-orange-500 text-2xl" /> },
    { label: "Order Completed", icon: <FaBoxOpen className="text-green-500 text-2xl" /> },
  ];

  const statusIndex = statusOptions.findIndex((step) => step.label === orderStatus);

  // Fetch order status from both APIs
  const fetchOrderStatus = async () => {
    if (!orderId.trim()) {
      setError("❌ Please enter a valid Order ID.");
      setOrderStatus("");
      setTrackingActive(false);
      return;
    }

    setLoading(true);
    setError(""); // Clear previous errors

    try {
      // Call both APIs simultaneously
      const [response1, response2] = await Promise.all([
        axios.get(`http://localhost:8080/api/orders/${orderId}/status`),
        axios.get(`http://localhost:8080/api/tbb/${orderId}/status`),
      ]);

      // Extract status from both responses
      const status1 = response1.data.status;
      const status2 = response2.data.status;

      // Prioritize the first response if both exist
      if (status1 || status2) {
        setOrderStatus(status1 || status2);
        setTrackingActive(true);
      } else {
        throw new Error("Order not found");
      }
    } catch (err) {
      setError("❌ Order not found. Please check your Order ID.");
      setOrderStatus("");
      setTrackingActive(false);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto mt-20 p-6 bg-white rounded-lg shadow-md mb-40">
      <h2 className="text-3xl font-semibold text-center mb-6 text-gray-700">Order Tracking</h2>

      {/* Order Input */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Enter Order ID"
          className={`p-3 border ${error ? "border-red-500" : "border-gray-300"} rounded-l-md w-64 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />
        <button
          className={`px-6 py-3 font-semibold rounded-r-md shadow-md transition-all transform hover:scale-105 active:scale-95 ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
          }`}
          onClick={fetchOrderStatus}
          disabled={loading}
        >
          {loading ? "⏳ Tracking..." : "🚀 Track Order"}
        </button>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 text-center font-semibold">{error}</p>}

      {/* Progress Section - Only show when tracking is active */}
      {trackingActive && orderStatus && (
        <div className="mt-8 relative">
          {/* Progress Line */}
          <div className="relative flex items-center justify-between">
            {statusOptions.map((step, index) => (
              <div key={index} className="flex flex-col items-center group relative">
                {/* Step Circle */}
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    index <= statusIndex ? "bg-green-500 text-white" : "bg-gray-300 text-gray-600"
                  } transition-all duration-300`}
                >
                  {step.icon}
                </div>

                {/* Step Label */}
                <p
                  className={`mt-2 text-sm font-medium transition-all ${
                    index <= statusIndex ? "text-green-600" : "text-gray-500"
                  } group-hover:text-black`}
                >
                  {step.label}
                </p>

                {/* Real-time Line */}
                {index < statusOptions.length - 1 && (
                  <div
                    className={`absolute top-6 left-full h-1 bg-gray-300 w-20`}
                    style={{
                      backgroundColor: index < statusIndex ? "#22c55e" : "#d1d5db",
                      transition: "background-color 0.5s ease-in-out",
                    }}
                  ></div>
                )}
              </div>
            ))}
          </div>

          {/* Real-time Progress Bar */}
          <div className="w-full bg-gray-300 h-3 mt-6 rounded-full relative">
            <div
              className="h-3 bg-green-500 rounded-full transition-all duration-500"
              style={{ width: `${(statusIndex / (statusOptions.length - 1)) * 100}%` }}
            ></div>
          </div>

          {/* Current Status */}
          <p className="text-center mt-6 text-gray-700 text-lg">
            Current Status: <span className="font-semibold text-green-600">{orderStatus}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default Track;
