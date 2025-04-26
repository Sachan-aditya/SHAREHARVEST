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
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
        Available Food Items
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {foodItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
          >
            <img
              src={item.photoUrl || "https://picsum.photos/300/200"}
              alt={item.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
              <p className="text-gray-600">{item.description}</p>
              <p className="text-gray-800 font-medium">
                Quantity: {item.quantity}
              </p>
              <p className="text-gray-600">Donor: {item.donor.username}</p>
              {user && user.role === "RECEIVER" && (
                <button
                  onClick={() => handleRequest(item.id)}
                  className="mt-4 w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
  );
}

export default FoodItems;