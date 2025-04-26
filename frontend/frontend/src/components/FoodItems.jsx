import { useState, useEffect } from "react";

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
    <div className="min-h-screen bg-food-bg bg-cover bg-center py-16">
      <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
      <div className="relative container mx-auto px-4">
        <h2 className="text-4xl font-heading font-bold text-white text-center mb-12">
          Available Food Items
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {foodItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform"
            >
              <img
                src={item.photoUrl || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-heading font-semibold text-soil-brown">{item.name}</h3>
                <p className="text-gray-600 mt-2">{item.description}</p>
                <p className="text-soil-brown font-medium mt-2">Quantity: {item.quantity}</p>
                <p className="text-gray-600">Donor: {item.donor.username}</p>
                {user && user.role === "RECEIVER" && (
                  <button
                    onClick={() => handleRequest(item.id)}
                    className="mt-4 w-full bg-leaf-green text-deep-green py-2 rounded-full hover:bg-harvest-gold transition"
                    aria-label={`Request ${item.name}`}
                  >
                    Request
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