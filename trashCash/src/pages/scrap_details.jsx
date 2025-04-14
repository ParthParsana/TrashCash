import React, { useEffect, useState } from "react";
import axios from "axios";

function ScrapDetails() {
  const [scrapItems, setScrapItems] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/trashitem/all") // Replace with your actual API endpoint
      .then((response) => {
        setScrapItems(response.data);
      })
      .catch((error) => {
        console.error("Error fetching scrap data:", error);
      });
  }, []);

  return (
    <div className="bg-green-50 min-h-screen flex flex-col items-center">
      <h1 className="text-2xl font-bold mt-6 mb-8">Normal Recyclables</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 max-w-screen-lg">
        {scrapItems.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-2xl shadow-main rounded-lg p-4 flex flex-col items-center"
          >
            <img src={item.image} alt={item.name} className="mb-4 w-full h-40 object-cover" />
            <p className="text-green-600 font-bold text-lg">{item.price} Rs/KG</p>
            <p className="text-center text-gray-700 mt-2">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ScrapDetails;
