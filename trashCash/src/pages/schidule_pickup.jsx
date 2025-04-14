import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Pickup_svg from "../assets/Schidule_pickup_svg.svg";
import { FaLocationDot } from "react-icons/fa6";

function SchedulePickupForm() {
  const navigate = useNavigate();
  const [location, setLocation] = useState(""); // Store location string
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    weight: "",
    remarks: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Function to get user's location
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successCallback);
    }
  };

  const successCallback = async (position) => {
    const { latitude, longitude } = position.coords;
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data && data.display_name) {
        setLocation(data.display_name); // Store address in location
      }
    } catch (error) {
      console.error("Failed to fetch location data.");
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear errors on change
  };

  // Validate fields before submitting
  const validateForm = () => {
    let newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[6-9]\d{9}$/;

    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format.";
    }
    if (!formData.phone) {
      newErrors.phone = "Phone number is required.";
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Enter a valid 10-digit phone number.";
    }
    if (!formData.weight) newErrors.weight = "Please select weight.";
    if (!location) newErrors.location = "Please select your location.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    const payload = {
      name: formData.name,
      email: formData.email,
      mobileNumber: formData.phone,
      weight: formData.weight,
      remarks: formData.remarks,
      currentLocation: location,
    };

    try {
      const response = await axios.post("http://localhost:8080/api/orders/add", payload, {
        headers: { "Content-Type": "application/json" },
      });
      console.log(response.data);
      alert("Pickup scheduled successfully!");

      // Reset form
      setFormData({ name: "", email: "", phone: "", weight: "", remarks: "" });
      setLocation(""); 
      navigate("/home"); 
    } catch (error) {
      console.error("Error scheduling pickup:", error);
      alert("Failed to schedule pickup. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#ffffff] flex items-center justify-center">
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg flex flex-wrap lg:flex-nowrap">
        {/* Image Section */}
        <div className="w-full lg:w-1/2 flex justify-center items-center bg-[#ffffff] p-6">
          <img src={Pickup_svg} alt="Illustration" className="w-full max-w-sm" />
        </div>

        {/* Form Section */}
        <div className="w-full lg:w-1/2 p-6 space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">Schedule a Pickup</h2>
          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border rounded-md px-4 py-2"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border rounded-md px-4 py-2"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border rounded-md px-4 py-2"
              />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
            </div>

            {/* Weight */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Estimated Weight</label>
              <select
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className="w-full border rounded-md px-4 py-2"
              >
                <option value="">Select Weight</option>
                <option value="1-5 KG">1-5 KG</option>
                <option value="6-10 KG">6-10 KG</option>
                <option value="10+ KG">10+ KG</option>
              </select>
              {errors.weight && <p className="text-red-500 text-sm">{errors.weight}</p>}
            </div>

            {/* Remarks */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Remarks (Optional)</label>
              <textarea
                name="remarks"
                rows="3"
                value={formData.remarks}
                onChange={handleChange}
                className="w-full border rounded-md px-4 py-2 text-gray-700 outline-none"
              ></textarea>
            </div>

            {/* Location */}
            <div className="text-center">
              <button
                type="button"
                className="w-full bg-green-500 text-white py-3 rounded-md text-lg flex items-center justify-center gap-2 transition"
                onClick={getLocation}
              >
                <FaLocationDot /> Select Location
              </button>
              {location && <p className="mt-2 text-green-600">📍 {location}</p>}
              {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full py-3 rounded-md text-lg ${isLoading ? "bg-gray-400" : "bg-green-500 text-white hover:bg-main transition"}`}
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Schedule a Pickup"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SchedulePickupForm;
