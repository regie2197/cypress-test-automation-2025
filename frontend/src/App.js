import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

function LoginPage() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const response = await fetch("http://localhost:5001/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (response.ok) {
      const { session_id, identity_session_id } = await response.json();
      Cookies.set("session_id", session_id);
      Cookies.set("identity_session_id", identity_session_id);
      navigate("/profile");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-xl mb-4">Log in</h2>
      <input
        type="password"
        placeholder="Enter Password"
        data-testid="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 rounded mb-2"
      />
      <button data-testid="login-button" className="bg-blue-500 text-white p-2 rounded" onClick={handleLogin}>
        Log in
      </button>
    </div>
  );
}

function ProfilePage() {
  return <h1 className="text-center mt-10">Welcome to Your Profile</h1>;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
