import { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState(null);

  const navigate = useNavigate();

  // 👇 Get user (for role-based UI)
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    } else {
      fetchTasks();
    }
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks", error);
    }
  };

  // ➕ ADD / ✏️ UPDATE
  const handleSubmit = async () => {
    if (!title) return;

    try {
      if (editId) {
        await API.put(`/tasks/${editId}`, { title, description });
        setEditId(null);
      } else {
        await API.post("/tasks", { title, description });
      }

      setTitle("");
      setDescription("");
      fetchTasks();
    } catch {
      alert("Error saving task");
    }
  };

  // ✏️ EDIT
  const handleEdit = (task) => {
    setTitle(task.title);
    setDescription(task.description || "");
    setEditId(task._id);
  };

  // 🗑 DELETE
  const handleDelete = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    } catch {
      alert("Only admin can delete");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div style={{
      maxWidth: "750px",
      margin: "40px auto",
      padding: "25px",
      background: "#f8fafc",
      borderRadius: "12px",
      fontFamily: "Segoe UI"
    }}>

      {/* HEADER */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <h2>🚀 Task Dashboard</h2>

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <span style={{ fontSize: "14px", color: "#555" }}>
            Role: <b>{user?.role}</b>
          </span>

          <button
            onClick={handleLogout}
            style={{
              padding: "8px 14px",
              background: "#e74c3c",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer"
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* FORM */}
      <div style={{
        marginTop: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "10px"
      }}>
        <input
          placeholder="Task title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={inputStyle}
        />

        <input
          placeholder="Description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={inputStyle}
        />

        <button
          onClick={handleSubmit}
          style={{
            padding: "10px",
            background: editId ? "#f39c12" : "#3498db",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          {editId ? "Update Task" : "Add Task"}
        </button>
      </div>

      {/* TASK LIST */}
      <div style={{ marginTop: "25px" }}>
        {tasks.length > 0 ? tasks.map((task) => (
          <div key={task._id} style={{
            background: "#fff",
            padding: "15px",
            borderRadius: "8px",
            marginBottom: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
          }}>

            <h4 style={{ margin: 0 }}>{task.title}</h4>
            <p style={{ color: "#666", margin: "5px 0 10px" }}>
              {task.description}
            </p>

            <div style={{ display: "flex", gap: "10px" }}>

              {/* EDIT (everyone can) */}
              <button
                onClick={() => handleEdit(task)}
                style={editBtn}
              >
                ✏️ Edit
              </button>

              {/* DELETE (admin OR owner) */}
{(user?.role === "admin" || user?.id === (task.user?._id || task.user)) && (
  <button
    onClick={() => handleDelete(task._id)}
    style={deleteBtn}
  >
    🗑 Delete
  </button>
)}
            </div>

          </div>
        )) : (
          <p style={{ textAlign: "center", color: "#888" }}>
            No tasks yet.
          </p>
        )}
      </div>
    </div>
  );
}

/* 🎨 STYLES */
const inputStyle = {
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc"
};

const editBtn = {
  background: "#f1c40f",
  border: "none",
  padding: "6px 12px",
  borderRadius: "5px",
  cursor: "pointer"
};

const deleteBtn = {
  background: "#e74c3c",
  color: "#fff",
  border: "none",
  padding: "6px 12px",
  borderRadius: "5px",
  cursor: "pointer"
};