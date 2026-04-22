import { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false); // Added loading state

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/dashboard");
    } else {
      fetchUsers();
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const fetchUsers = async () => {
    const res = await API.get("/admin/users");
    setUsers(res.data);
  };

  const fetchTasks = async (userId) => {
    setLoading(true); // Start loading
    setSelectedUser(userId);
    const res = await API.get(`/admin/tasks/${userId}`);
    setTasks(res.data);
    setLoading(false); // Stop loading
  };

  const addTask = async () => {
    if (!title) return;
    await API.post(`/admin/tasks/${selectedUser}`, { title });
    setTitle("");
    fetchTasks(selectedUser);
  };

  const deleteTask = async (id) => {
    await API.delete(`/admin/tasks/${id}`);
    fetchTasks(selectedUser);
  };

  return (
    <div style={{ padding: "40px", maxWidth: "1000px", margin: "auto", fontFamily: "sans-serif" }}>
      {/* HEADER WITH LOGOUT */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "2px solid #eee", paddingBottom: "10px" }}>
        <h2 style={{ color: "#333", margin: 0 }}>🛠 Admin Dashboard</h2>
        <button 
          onClick={handleLogout}
          style={{ padding: "8px 16px", backgroundColor: "#6c757d", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
        >
          Logout
        </button>
      </div>

      {/* USERS SECTION */}
      <section style={{ marginTop: "30px", marginBottom: "30px" }}>
        <h3>Registered Users</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {users.map(u => (
            <button
              key={u._id}
              onClick={() => fetchTasks(u._id)}
              style={{
                padding: "10px 15px",
                backgroundColor: selectedUser === u._id ? "#007bff" : "#f8f9fa",
                color: selectedUser === u._id ? "#fff" : "#333",
                border: "1px solid #ddd",
                borderRadius: "6px",
                cursor: "pointer",
                transition: "0.3s"
              }}
            >
              {u.name}
            </button>
          ))}
        </div>
      </section>

      {/* TASKS SECTION */}
      {selectedUser && (
        <section style={{ backgroundColor: "#f9f9f9", padding: "20px", borderRadius: "8px" }}>
          <h3>Manage Tasks</h3>
          <div style={{ marginBottom: "20px" }}>
            <input
              style={{ padding: "10px", width: "250px", marginRight: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
              placeholder="Enter new task title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <button 
              onClick={addTask}
              style={{ padding: "10px 20px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
            >
              Add Task
            </button>
          </div>

          {loading ? <p>Loading tasks...</p> : (
            <ul style={{ listStyle: "none", padding: 0 }}>
              {tasks.map(t => (
                <li key={t._id} style={{ background: "white", padding: "10px", marginBottom: "8px", borderRadius: "4px", display: "flex", justifyContent: "space-between", alignItems: "center", borderLeft: "4px solid #007bff" }}>
                  {t.title}
                  <button 
                    onClick={() => deleteTask(t._id)}
                    style={{ padding: "5px 10px", backgroundColor: "#dc3545", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}
    </div>
  );
}