import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [data, setData] = useState({ name:"", email:"", password:"" });
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await API.post("/auth/register", data);
      alert("Registration successful! Please login.");
      navigate("/");
    } catch (err) {
      // If the backend returns 400, it means the email is already taken
      if (err.response && err.response.status === 400) {
        alert("Account already registered! Please login.");
      } else {
        alert("Registration failed. Please try again.");
      }
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "100px auto", padding: "2rem", borderRadius: "12px", boxShadow: "0 4px 20px rgba(0,0,0,0.1)", textAlign: "center", backgroundColor: "#fff" }}>
      <h2 style={{ color: "#333", marginBottom: "1.5rem" }}>Create Account</h2>
      <input style={{ display: "block", width: "100%", padding: "12px", margin: "10px 0", borderRadius: "6px", border: "1px solid #ccc", boxSizing: "border-box" }} placeholder="Name" onChange={(e)=>setData({...data,name:e.target.value})}/>
      <input style={{ display: "block", width: "100%", padding: "12px", margin: "10px 0", borderRadius: "6px", border: "1px solid #ccc", boxSizing: "border-box" }} placeholder="Email" onChange={(e)=>setData({...data,email:e.target.value})}/>
      <input style={{ display: "block", width: "100%", padding: "12px", margin: "10px 0", borderRadius: "6px", border: "1px solid #ccc", boxSizing: "border-box" }} type="password" placeholder="Password" onChange={(e)=>setData({...data,password:e.target.value})}/>
      
      <button style={{ width: "100%", padding: "12px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", marginTop: "10px", fontSize: "16px" }} onClick={handleRegister}>Register</button>
      
      <div style={{ marginTop: "15px" }}>
        <p style={{ fontSize: "14px", color: "#666" }}>Already registered?</p>
        <button 
          onClick={() => navigate("/")}
          style={{ background: "none", border: "none", color: "#28a745", cursor: "pointer", fontWeight: "bold" }}
        >
          Login here
        </button>
      </div>
    </div>
  );
}