import { useState, useEffect } from "react";

function Requests({ user }) {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    if (!user) return;
    const endpoint =
      user.role === "DONOR"
        ? `${import.meta.env.VITE_API_URL}/api/requests/donor/${user.id}`
        : `${import.meta.env.VITE_API_URL}/api/requests/receiver/${user.id}`;
    fetch(endpoint).then((res) => res.json()).then((data) => setRequests(data));
  }, [user]);

  const handleUpdateStatus = async (requestId, status) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/requests/${requestId}/status`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(status),
      }
    );
    if (response.ok) {
      alert(`Request ${status.toLowerCase()}!`);
      setRequests(requests.filter((req) => req.id !== requestId));
    } else {
      alert("Failed to update request status!");
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <p className="text-gray-900">Please log in to view requests.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
        {user.role === "DONOR" ? "Requests for Your Items" : "Your Requests"}
      </h2>
      <div className="space-y-6">
        {requests.map((req) => (
          <div
            key={req.id}
            className="bg-white rounded-lg shadow-md p-6 flex justify-between items-center"
          >
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                {req.foodItem.name}
              </h3>
              <p className="text-gray-600">
                {user.role === "DONOR"
                  ? `Requested by: ${req.receiver.username}`
                  : `Donor: ${req.foodItem.donor.username}`}
              </p>
              <span
                className={`inline-block px-2 py-1 rounded-full text-sm font-medium ${
                  req.status === "PENDING"
                    ? "bg-yellow-400 text-gray-800"
                    : req.status === "ACCEPTED"
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                }`}
              >
                {req.status}
              </span>
            </div>
            {user.role === "DONOR" && req.status === "PENDING" && (
              <div className="space-x-2">
                <button
                  onClick={() => handleUpdateStatus(req.id, "ACCEPTED")}
                  className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  aria-label={`Accept request for ${req.foodItem.name}`}
                >
                  Accept
                </button>
                <button
                  onClick={() => handleUpdateStatus(req.id, "REJECTED")}
                  className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  aria-label={`Reject request for ${req.foodItem.name}`}
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Requests;