import { useState, useEffect } from "react";
import { Filter } from "lucide-react";

function FoodItems({ user }) {
  const [foodItems, setFoodItems] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    quantity: "",
    photoUrl: "",
    expiryDate: "",
  });

  useEffect(() => {
    fetchFoodItems();
  }, []);

  const fetchFoodItems = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/food-items`);
      const data = await res.json();
      setFoodItems(data);
    } catch (error) {
      console.error("Error fetching food items:", error);
      alert("Failed to load food items.");
    }
  };

  const handleRequest = async (foodItemId) => {
    if (!user || user.role !== "RECEIVER") {
      alert("Only receivers can request food items!");
      return;
    }
    const request = {
      foodItem: { id: foodItemId },
      receiver: { id: user.id },
    };
    try {
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
    } catch (error) {
      alert(`Error submitting request: ${error.message}`);
    }
  };

  const handleAddFoodItem = async (e) => {
    e.preventDefault();
    if (!user || user.role !== "DONOR") {
      alert("Only donors can add food items!");
      return;
    }

    const quantityNum = parseInt(formData.quantity, 10);
    if (isNaN(quantityNum) || quantityNum <= 0) {
      alert("Please enter a valid quantity greater than 0.");
      return;
    }

    const expiryDateISO = formData.expiryDate
      ? new Date(formData.expiryDate).toISOString().split("T")[0] + "T00:00:00Z"
      : new Date().toISOString();

    const newFoodItem = {
      name: formData.name,
      description: formData.description,
      category: formData.category,
      quantity: quantityNum,
      photoUrl: formData.photoUrl.trim() || null,
      expiryDate: expiryDateISO,
      donor: { id: user.id },
      available: true,
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/food-items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newFoodItem),
      });
      if (response.ok) {
        const addedItem = await response.json();
        // Update state with the new item immediately
        setFoodItems([...foodItems, addedItem]);
        setIsFormOpen(false);
        setFormData({
          name: "",
          description: "",
          category: "",
          quantity: "",
          photoUrl: "",
          expiryDate: "",
        });
        alert("Food item added successfully!");
      } else {
        const error = await response.text();
        alert(`Failed to add food item: ${error}`);
      }
    } catch (error) {
      alert(`Error adding food item: ${error.message}`);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

        {/* Filter and Add Button */}
        <div className="flex justify-between px-6 mb-8">
          <button className="flex items-center bg-yellow text-white px-4 py-2 rounded-lg hover:bg-amber-400 transition-colors duration-300">
            <Filter className="h-5 w-5 mr-2" />
            Filter by Category
          </button>
          {user && user.role === "DONOR" && (
            <button
              onClick={() => setIsFormOpen(true)}
              className="bg-yellow text-white px-4 py-2 rounded-lg hover:bg-amber-400 transition-colors duration-300"
              aria-label="Add new food item"
            >
              Add Food Item
            </button>
          )}
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
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80";
                }}
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-deep-green mb-2">{item.name}</h3>
                <p className="text-gray-700 mb-2">{item.description}</p>
                <p className="text-deep-green font-medium mb-1">Quantity: {item.quantity}</p>
                <p className="text-deep-green font-medium mb-1">Category: {item.category || "General"}</p>
                <p className="text-deep-green font-medium mb-1">
                  Expires: {item.expiryDate ? new Date(item.expiryDate).toLocaleDateString() : "N/A"}
                </p>
                <p className="text-gray-700 mb-4">Donor: {item.donor.username}</p>
                <p className="text-gray-700 mb-4">Status: {item.available ? "Available" : "Not Available"}</p>
                {user && user.role === "RECEIVER" && item.available && (
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

        {/* Add Food Item Modal */}
        {isFormOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-off-white rounded-2xl p-6 w-full max-w-md">
              <h3 className="text-2xl font-semibold text-deep-green mb-4">
                Add New Food Item
              </h3>
              <form onSubmit={handleAddFoodItem} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-deep-green">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-yellow focus:ring-yellow sm:text-sm p-2"
                  />
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-deep-green">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-yellow focus:ring-yellow sm:text-sm p-2"
                  />
                </div>
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-deep-green">
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-yellow focus:ring-yellow sm:text-sm p-2"
                  >
                    <option value="">Select a category</option>
                    <option value="Vegetables">Vegetables</option>
                    <option value="Fruits">Fruits</option>
                    <option value="Grains">Grains</option>
                    <option value="Dairy">Dairy</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="quantity" className="block text-sm font-medium text-deep-green">
                    Quantity
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    required
                    min="1"
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-yellow focus:ring-yellow sm:text-sm p-2"
                  />
                </div>
                <div>
                  <label htmlFor="photoUrl" className="block text-sm font-medium text-deep-green">
                    Photo URL
                  </label>
                  <input
                    type="url"
                    id="photoUrl"
                    name="photoUrl"
                    value={formData.photoUrl}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-yellow focus:ring-yellow sm:text-sm p-2"
                  />
                </div>
                <div>
                  <label htmlFor="expiryDate" className="block text-sm font-medium text-deep-green">
                    Expiry Date
                  </label>
                  <input
                    type="date"
                    id="expiryDate"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-yellow focus:ring-yellow sm:text-sm p-2"
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="bg-gray-300 text-deep-green p-2 rounded-lg hover:bg-gray-400 transition-colors duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-yellow text-white p-2 rounded-lg hover:bg-amber-400 transition-colors duration-300"
                  >
                    Add Food Item
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FoodItems;