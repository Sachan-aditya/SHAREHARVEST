import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Menu, X, Facebook, Twitter, Instagram, Mail } from "lucide-react";

import Home from "./components/home";
import Login from "./components/Login";
import Register from "./components/Register";
import AddFoodItem from "./components/AddFoodItem";
import FoodItems from "./components/FoodItems";
import Requests from "./components/Requests";

function App() {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Load user from localStorage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Update localStorage whenever user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    setIsMenuOpen(false);
  };

  return (
    <Router>
      <div className="min-h-screen bg-light-green font-sans flex flex-col">
        {/* Navigation Bar */}
        <nav className="sticky top-0 bg-deep-green shadow-md z-20 w-full">
          <div className="flex justify-between items-center relative w-full">
            <Link to="/" className="text-3xl font-bold text-white p-4">
              <span className="text-yellow">Share</span>
              <span className="text-white">Harvest</span>
            </Link>
            <button
              className="md:hidden text-white p-4 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div
              className={`${
                isMenuOpen ? "flex" : "hidden"
              } md:flex flex-col md:flex-row md:items-center md:space-x-6 absolute md:static top-full left-0 w-full md:w-auto bg-deep-green md:bg-transparent p-4 md:p-0 transition-all duration-300 ease-in-out`}
            >
              <Link to="/" className="block text-white hover:text-yellow transition-colors duration-300 py-2 md:py-0 md:px-2">
                Home
              </Link>
              <Link to="/food-items" className="block text-white hover:text-yellow transition-colors duration-300 py-2 md:py-0 md:px-2">
                Food Items
              </Link>
              {user ? (
                <>
                  <span className="block text-yellow hidden sm:inline md:inline py-2 md:py-0 md:px-2">
                    Welcome, {user.username}
                  </span>
                  {user.role === "DONOR" && (
                    <Link to="/add-food-item" className="block text-white hover:text-yellow transition-colors duration-300 py-2 md:py-0 md:px-2">
                      Add Food Item
                    </Link>
                  )}
                  <Link to="/requests" className="block text-white hover:text-yellow transition-colors duration-300 py-2 md:py-0 md:px-2">
                    Requests
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full md:w-auto bg-yellow text-white px-4 py-2 rounded-full hover:bg-amber-400 transition-colors duration-300 mt-2 md:mt-0"
                    aria-label="Logout"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="w-full md:w-auto bg-yellow text-white px-4 py-2 rounded-full hover:bg-amber-400 transition-colors duration-300 mt-2 md:mt-0">
                    Login
                  </Link>
                  <Link to="/register" className="block text-white hover:text-yellow transition-colors duration-300 py-2 md:py-0 md:px-2">
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="flex-1 w-full max-w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/register" element={<Register setUser={setUser} />} />
            <Route path="/add-food-item" element={<AddFoodItem user={user} />} />
            <Route path="/food-items" element={<FoodItems user={user} />} />
            <Route path="/requests" element={<Requests user={user} />} />
          </Routes>
        </div>

        {/* Footer */}
        <footer className="bg-medium-green text-white w-full">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6">
            <div>
              <h3 className="text-xl font-bold text-yellow mb-4">
                ShareHarvest
              </h3>
              <p className="text-white">
                Connecting donors and receivers to reduce food waste and support communities across India.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-yellow mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-white hover:text-yellow transition-colors duration-300">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/food-items" className="text-white hover:text-yellow transition-colors duration-300">
                    Food Items
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="text-white hover:text-yellow transition-colors duration-300">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="text-white hover:text-yellow transition-colors duration-300">
                    Register
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-yellow mb-4">
                Contact Us
              </h3>
              <p className="text-white">
                123 Community Road, New Delhi, India
                <br />
                Phone: +91 8318407056
                <br />
                Email: sachanaditya207@gmail.com
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-yellow mb-4">
                Stay Connected
              </h3>
              <div className="flex space-x-4 mb-4">
                <a href="#" className="text-white hover:text-yellow transition-colors duration-300">
                  <Facebook size={24} />
                </a>
                <a href="#" className="text-white hover:text-yellow transition-colors duration-300">
                  <Twitter size={24} />
                </a>
                <a href="#" className="text-white hover:text-yellow transition-colors duration-300">
                  <Instagram size={24} />
                </a>
              </div>
              <div className="flex items-center">
                <input
                  type="email"
                  placeholder="Subscribe to our newsletter"
                  className="w-full p-2 rounded-l-lg text-deep-green focus:outline-none"
                />
                <button className="bg-yellow text-white p-2 rounded-r-lg hover:bg-amber-400 transition-colors duration-300">
                  <Mail size={24} />
                </button>
              </div>
            </div>
          </div>
          <div className="text-center text-white p-4 border-t border-white/20">
            <p>© 2025 ShareHarvest. All rights reserved.</p>
            <div className="mt-2 space-x-4">
              <a href="#" className="hover:text-yellow transition-colors duration-300">
                Terms
              </a>
              <a href="#" className="hover:text-yellow transition-colors duration-300">
                Privacy
              </a>
              <a href="#" className="hover:text-yellow transition-colors duration-300">
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