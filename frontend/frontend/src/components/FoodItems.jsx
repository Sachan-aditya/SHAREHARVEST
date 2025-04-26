import { useState, useEffect } from "react";
import { Filter } from "lucide-react";

function FoodItems({ user }) {
  const [foodItems, setFoodItems] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/food-items`)
      .then((res) => res.json())
      .then((data) => setFoodItems(data));
  }, []);

  const handleRequest = async (foodItemId) => {
    if (!user || user.role !== "RECEIVER") {
      alert("Only receivers can request food items!");
      return;
    }
    const request = {
      foodItem: { id: foodItemId },
      receiver: { id: user.id },
    };
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/requests`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    });
    if (response.ok) {
      alert("Request submitted successfully!");
      setFoodItems(foodItems.filter((item) => item.id !== foodItemId));
    } else {
      const error = await response.text();
      alert(`Request failed: ${error}`);
    }
  };

  return (
    <div className="min-h-screen bg-food-items-bg bg-cover bg-center relative">
      <div className="absolute inset-0 bg-medium-green opacity-60"></div>
      <div className="relative w-full max-w-full py-16">
        {/* Heading with Quote */}
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Available Food Items
          </h2>
          <p className="text-2xl italic text-yellow flex items-center justify-center">
            <span className="mr-2">"</span>Sharing is Caring<span className="ml-2">"</span>
          </p>
        </div>

        {/* Filter Option (Simulated) */}
        <div className="flex justify-end px-6 mb-8">
          <button className="flex items-center bg-yellow text-white px-4 py-2 rounded-lg hover:bg-amber-400 transition-colors duration-300">
            <Filter className="h-5 w-5 mr-2" />
            Filter by Category
          </button>
        </div>

        {/* Food Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6">
          {foodItems.map((item) => (
            <div
              key={item.id}
              className="bg-off-white rounded-2xl shadow-lg overflow-hidden transform hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <img
                src={item.photoUrl || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"}
                alt={item.name}
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-deep-green mb-2">{item.name}</h3>
                <p className="text-gray-700 mb-2">{item.description}</p>
                <p className="text-deep-green font-medium mb-1">Quantity: {item.quantity}</p>
                <p className="text-deep-green font-medium mb-1">Category: {item.category || "General"}</p>
                <p className="text-deep-green font-medium mb-1">Expires: {item.expiry || "N/A"}</p>
                <p className="text-gray-700 mb-4">Donor: {item.donor.username}</p>
                {user && user.role === "RECEIVER" && (
                  <button
                    onClick={() => handleRequest(item.id)}
                    className="w-full bg-yellow text-white py-3 rounded-lg font-semibold hover:bg-amber-400 transition-colors duration-300"
                    aria-label={`Request ${item.name}`}
                  >
                    Request Now
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FoodItems;