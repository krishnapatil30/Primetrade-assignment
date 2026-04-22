import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false); // 
  const navigate = useNavigate();

  const handleLogin = async () => {
     setLoading(true);
  try {
    const res = await API.post("/auth/login", data);

    // ✅ Save token
    localStorage.setItem("token", res.data.token);

    // ✅ Save user (VERY IMPORTANT)
    localStorage.setItem("user", JSON.stringify(res.data.user));

    // ✅ Role-based redirect
    if (res.data.user.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/dashboard");
    }

  } catch {
    alert("Invalid email or password");
  }finally {
    setLoading(false); // 👈 stop loading
  }
};

  return (
    // Everything is now inside this single parent div
    <div style={{ maxWidth: "400px", margin: "100px auto", padding: "2rem", borderRadius: "12px", boxShadow: "0 4px 20px rgba(0,0,0,0.1)", textAlign: "center", backgroundColor: "#fff" }}>
      
      {/* Main Login Form Content */}
      <h2 style={{ color: "#333", marginBottom: "1.5rem" }}>Login</h2>
      <input 
        style={{ display: "block", width: "100%", padding: "12px", margin: "10px 0", borderRadius: "6px", border: "1px solid #ccc", boxSizing: "border-box" }}
        placeholder="Email" 
        onChange={(e)=>setData({...data,email:e.target.value})}
      />
      <input 
        style={{ display: "block", width: "100%", padding: "12px", margin: "10px 0", borderRadius: "6px", border: "1px solid #ccc", boxSizing: "border-box" }}
        type="password" placeholder="Password" 
        onChange={(e)=>setData({...data,password:e.target.value})}
      />
      <button 
  onClick={handleLogin}
  disabled={loading}
  style={{ 
    width: "100%", 
    padding: "12px", 
    backgroundColor: loading ? "#aaa" : "#007bff", 
    color: "white", 
    border: "none", 
    borderRadius: "6px", 
    cursor: loading ? "not-allowed" : "pointer",
    marginTop: "10px",
    fontSize: "16px"
  }}
>
  {loading ? "Logging in..." : "Login"}
</button>

      {/* Redirect to Register */}
      <div style={{ marginTop: "15px" }}>
        <p style={{ fontSize: "14px", color: "#666" }}>Don't have an account?</p>
        <button 
          onClick={() => navigate("/register")}
          style={{ background: "none", border: "none", color: "#007bff", cursor: "pointer", fontWeight: "bold" }}
        >
          Create Account
        </button>
      </div>

    </div>
  );
}