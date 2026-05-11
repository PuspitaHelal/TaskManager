import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const userId = localStorage.getItem("userId");
  const API = "http://localhost:5000/tasks";

  // LOAD TASKS
  useEffect(() => {
    axios.get(`${API}/${userId}`).then((res) => {
      setTasks(res.data);
    });
  }, [userId]);

  // ADD TASK
  const addTask = async () => {
    if (!task.trim()) return;

    try {
      const res = await axios.post(API, {
        title: task,
        userId,
        completed: false,
      });

      setTasks((prev) => [...prev, res.data]);
      setTask("");
    } catch (err) {
      console.log(err);
    }
  };

  // DELETE TASK (REAL + FRONTEND UPDATE)
  const deleteTask = async (id) => {
    try {
     axios.delete(`http://localhost:5000/tasks/${id}`);

      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.log("Delete error:", err);
    }
  };

  // TOGGLE COMPLETE (FRONTEND ONLY)
  const toggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((t) =>
        t._id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  return (
    <div style={styles.container}>
      <h1>👋 Welcome to Dashboard</h1>

      <div style={styles.card}>
        <input
          style={styles.input}
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter new task..."
        />

        <button style={styles.addBtn} onClick={addTask}>
          Add Task
        </button>
      </div>

      <div style={styles.list}>
        {tasks.map((t) => (
          <div key={t._id} style={styles.taskItem}>
            <span
              onClick={() => toggleComplete(t._id)}
              style={{
                ...styles.taskText,
                textDecoration: t.completed ? "line-through" : "none",
                color: t.completed ? "gray" : "black",
                cursor: "pointer",
              }}
            >
              {t.title}
            </span>

            <button
              style={styles.deleteBtn}
              onClick={() => deleteTask(t._id)}
            >
              ❌
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// STYLES
const styles = {
  container: {
    textAlign: "center",
    marginTop: "40px",
    fontFamily: "Arial",
  },
  card: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    margin: "20px",
  },
  input: {
    padding: "10px",
    width: "250px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  addBtn: {
    padding: "10px 15px",
    background: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  list: {
    width: "350px",
    margin: "auto",
  },
  taskItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px",
    margin: "5px 0",
    border: "1px solid #eee",
    borderRadius: "6px",
  },
  deleteBtn: {
    background: "red",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  taskText: {
    fontSize: "16px",
  },
};