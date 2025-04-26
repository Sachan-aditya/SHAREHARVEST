import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import Home from "./components/home";
import Login from "./components/Login";
import Register from "./components/Register";
import AddFoodItem from "./components/AddFoodItem";
import FoodItems from "./components/FoodItems";
import Requests from "./components/Requests";

function App() {
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <div className="min-h-screen bg-milk-white font-body">
        <nav className="sticky top-0 bg-primary-green text-white p-4 shadow-md z-10">
          <div className="container mx-auto flex justify-between items-center">
            <Link to="/" className="text-2xl font-heading font-bold">
              ShareHarvest
            </Link>
            <div className="space-x-4">
              <Link to="/" className="hover:text-harvest-gold">
                Home
              </Link>
              <Link to="/food-items" className="hover:text-harvest-gold">
                Food Items
              </Link>
              {user ? (
                <>
                  <span className="text-harvest-gold">
                    Welcome, {user.username}
                  </span>
                  {user.role === "DONOR" && (
                    <Link to="/add-food-item" className="hover:text-harvest-gold">
                      Add Food Item
                    </Link>
                  )}
                  <Link to="/requests" className="hover:text-harvest-gold">
                    Requests
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="hover:text-harvest-gold"
                    aria-label="Logout"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="hover:text-harvest-gold">
                    Login
                  </Link>
                  <Link to="/register" className="hover:text-harvest-gold">
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </nav>
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/register" element={<Register setUser={setUser} />} />
            <Route path="/add-food-item" element={<AddFoodItem user={user} />} />
            <Route path="/food-items" element={<FoodItems user={user} />} />
            <Route path="/requests" element={<Requests user={user} />} />
          </Routes>
        </div>
        <footer className="bg-soil-brown text-white py-8">
          <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-xl font-heading font-bold text-harvest-gold">
                ShareHarvest
              </h3>
              <p className="mt-2 font-body">
                Connecting donors and receivers to reduce food waste and support
                communities across India.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-heading font-bold text-harvest-gold">
                Quick Links
              </h3>
              <ul className="mt-2 space-y-2 font-body">
                <li>
                  <Link to="/" className="hover:text-harvest-gold">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/food-items" className="hover:text-harvest-gold">
                    Food Items
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="hover:text-harvest-gold">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="hover:text-harvest-gold">
                    Register
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-heading font-bold text-harvest-gold">
                Contact Us
              </h3>
              <p className="mt-2 font-body">
                123 Community Road, New Delhi, India
                <br />
                Phone: +91 8318407056
                <br />
                Email: sachanaditya207@gmail.com
              </p>
            </div>
          </div>
          <div className="mt-6 text-center font-body">
            <p>© 2025 ShareHarvest. All rights reserved.</p>
            <div className="mt-2 space-x-4">
              <a href="#" className="hover:text-harvest-gold">
                Terms
              </a>
              <a href="#" className="hover:text-harvest-gold">
                Privacy
              </a>
              <a href="#" className="hover:text-harvest-gold">
                Cookies
              </a>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;