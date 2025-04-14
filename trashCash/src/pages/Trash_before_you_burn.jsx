import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaLocationDot } from "react-icons/fa6";

function Trash_before_you_burn() {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    type: "", // Changed from wasteType to type
    remarks: "",
  });
  const [isLoading, setIsLoading] = useState(false);

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
        setLocation(data.display_name);
      }
    } catch (error) {
      console.error("Failed to fetch location data.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !formData.type || !location) {
      alert("Please fill out all required fields.");
      return;
    }

    setIsLoading(true);

    const payload = {
      name: formData.name,
      email: formData.email,
      mobileNumber: formData.phone,
      type: formData.type, // Ensure type matches backend
      remarks: formData.remarks,
      currentLocation: location,
    };

    try {
      const response = await axios.post("http://localhost:8080/api/tbb/add", payload, {
        headers: { "Content-Type": "application/json" },
      });
      console.log(response.data);
      alert("Pickup scheduled successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        type: "", // Reset field
        remarks: "",
      });
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
    <div className="min-h-screen bg-[#F9FDF9] flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8 my-12">
        <h2 className="text-2xl font-bold text-gray-800">Schedule Your Pickup</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required className="w-full border px-4 py-2 rounded-md mb-3" />
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required className="w-full border px-4 py-2 rounded-md mb-3" />
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" required className="w-full border px-4 py-2 rounded-md mb-3" />
          <select name="type" value={formData.type} onChange={handleChange} required className="w-full border px-4 py-2 rounded-md mb-3">
            <option value="">Select Waste Type</option>
            <option value="Plastic">Plastic</option>
            <option value="Metal">Metal</option>
            <option value="Electronic">Electronic</option>
            <option value="Organic">Organic</option>
          </select>
          <textarea name="remarks" value={formData.remarks} onChange={handleChange} placeholder="Remarks (Optional)" className="w-full border px-4 py-2 rounded-md mb-3"></textarea>
          <button type="button" onClick={getLocation} className="w-full bg-green-500 text-white py-3 rounded-md flex items-center justify-center gap-2">
            <FaLocationDot /> Select Location
          </button>
          {location && <p className="mt-2 text-green-600">📍 {location}</p>}
          <button type="submit" disabled={isLoading} className="w-full bg-green-500 text-white py-3 rounded-md mt-3">
            {isLoading ? "Processing..." : "Schedule Pickup"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Trash_before_you_burn;
