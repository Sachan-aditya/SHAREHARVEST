import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("RECEIVER");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/users/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, email, role }),
      }
    );
    if (response.ok) {
      const user = await response.json();
      setUser(user);
      navigate("/food-items");
    } else {
      const error = await response.text();
      alert(`Registration failed: ${error}`);
    }
  };

  return (
    <div className="min-h-screen bg-light-green flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-3xl shadow-2xl">
        <h2 className="text-3xl font-bold text-deep-green text-center">Create Your Account</h2>
        <form className="mt-8 space-y-6" onSubmit={handleRegister}>
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
            <label htmlFor="email" className="text-sm font-medium text-darker-green">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full p-3 border border-medium-green rounded-lg shadow-sm focus:ring-yellow focus:border-yellow"
              placeholder="Enter email"
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
          <div>
            <label htmlFor="role" className="text-sm font-medium text-darker-green">
              Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-1 block w-full p-3 border border-medium-green rounded-lg shadow-sm focus:ring-yellow focus:border-yellow"
            >
              <option value="RECEIVER">Receiver</option>
              <option value="DONOR">Donor</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-yellow text-darker-green font-bold p-3 rounded-full hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow transition-all"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
