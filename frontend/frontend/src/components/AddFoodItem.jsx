import { useState, useEffect } from "react";

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

  const handleAddFoodItem = async (e) => {
    e.preventDefault();
    if (!user || user.role !== "DONOR" || !user.id) {
      alert("Only authenticated donors can add food items!");
      return;
    }

    // Validate inputs
    if (!formData.name.trim()) {
      alert("Please enter a valid name.");
      return;
    }
    if (!formData.description.trim()) {
      alert("Please enter a valid description.");
      return;
    }
    if (!formData.category) {
      alert("Please select a category.");
      return;
    }
    const quantityNum = parseInt(formData.quantity, 10);
    if (isNaN(quantityNum) || quantityNum <= 0) {
      alert("Please enter a valid quantity greater than 0.");
      return;
    }
    if (!formData.photoUrl.trim()) {
      alert("Please enter a valid photo URL.");
      return;
    }
    if (!formData.expiryDate) {
      alert("Please select an expiry date.");
      return;
    }

    // Format expiryDate to ISO string
    const expiryDateISO = new Date(formData.expiryDate).toISOString().split("T")[0] + "T00:00:00Z";

    // Backend payload without photoUrl
    const newFoodItem = {
      name: formData.name.trim(),
      description: formData.description.trim(),
      category: formData.category.toUpperCase(), // Convert to uppercase to match potential enum
      quantity: quantityNum,
      expiryDate: expiryDateISO,
      donor: { id: user.id },
      available: true,
    };

    console.log("Sending payload:", newFoodItem); // Debug payload

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/food-items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newFoodItem),
      });
      if (response.ok) {
        const addedItem = await response.json();
        console.log("Added item from backend:", addedItem); // Debug response
        // Append photoUrl client-side
        const itemWithPhoto = { ...addedItem, photoUrl: formData.photoUrl.trim() };
        setFoodItems([...foodItems, itemWithPhoto]);
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
        const errorText = await response.text();
        console.error("Error response:", {
          status: response.status,
          statusText: response.statusText,
          body: errorText,
        });
        alert(`Failed to add food item: ${errorText}`);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert(`Failed to add food item: ${error.message}`);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageError = (e) => {
    e.target.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"; // Set placeholder
    setFormData((prev) => ({ ...prev, photoUrl: "" })); // Clear invalid URL
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Available Food Items</h2>
        {user && user.role === "DONOR" && (
          <button
            onClick={() => setIsFormOpen(true)}
            className="bg-green-600 text-white p-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            aria-label="Add new food item"
          >
            Add Food Item
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {foodItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
          >
            <img
              src={item.photoUrl || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"}
              alt={item.name}
              className="w-full h-48 object-cover"
              onError={(e) => (e.target.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80")} // Fallback for invalid URLs
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
              <p className="text-gray-600">{item.description}</p>
              <p className="text-gray-800 font-medium">Category: {item.category}</p>
              <p className="text-gray-800 font-medium">Quantity: {item.quantity}</p>
              <p className="text-gray-600">Donor: {item.donor.username}</p>
              <p className="text-gray-600">
                Expiry: {item.expiryDate ? new Date(item.expiryDate).toLocaleDateString() : "N/A"}
              </p>
              <p className="text-gray-600">
                Status: {item.available ? "Available" : "Not Available"}
              </p>
              {user && user.role === "RECEIVER" && item.available && (
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

      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Add New Food Item
            </h3>
            <form onSubmit={handleAddFoodItem} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="">Select a category</option>
                  <option value="VEGETABLES">Vegetables</option>
                  <option value="FRUITS">Fruits</option>
                  <option value="GRAINS">Grains</option>
                  <option value="DAIRY">Dairy</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
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
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="photoUrl" className="block text-sm font-medium text-gray-700">
                  Photo URL
                </label>
                <input
                  type="url"
                  id="photoUrl"
                  name="photoUrl"
                  value={formData.photoUrl}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {formData.photoUrl && (
                  <div className="mt-2">
                    <img
                      src={formData.photoUrl}
                      alt="Preview"
                      className="w-full h-32 object-cover rounded-md"
                      onError={handleImageError}
                    />
                  </div>
                )}
              </div>
              <div>
                <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
                  Expiry Date
                </label>
                <input
                  type="date"
                  id="expiryDate"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="bg-gray-300 text-gray-800 p-2 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-600 text-white p-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Add Food Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default FoodItems;