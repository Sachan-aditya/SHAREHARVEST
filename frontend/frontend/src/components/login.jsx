import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (response.ok) {
      const user = await response.json();
      setUser(user);
      navigate("/food-items");
    } else {
      alert("Login failed!");
    }
  };

  return (
    <div className="min-h-screen bg-light-green flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-3xl shadow-2xl">
        <h2 className="text-3xl font-bold text-deep-green text-center">Login to Your Account</h2>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div>
            <label htmlFor="username" className="text-sm font-medium text-darker-green">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full p-3 border border-medium-green rounded-lg shadow-sm focus:ring-yellow focus:border-yellow"
              placeholder="Enter username"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-medium text-darker-green">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full p-3 border border-medium-green rounded-lg shadow-sm focus:ring-yellow focus:border-yellow"
              placeholder="Enter password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-yellow text-darker-green font-bold p-3 rounded-full hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow transition-all"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
