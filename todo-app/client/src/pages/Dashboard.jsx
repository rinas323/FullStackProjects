import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../api";

export default function DashboardPage() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  async function fetchTodos() {
    const data = await apiRequest("/todos");
    if (data.error) navigate("/login");
    else setTodos(data);
  }

  async function addTodo(e) {
    e.preventDefault();
    if (!title.trim()) return;
    const newTodo = await apiRequest("/todos", {
      method: "POST",
      body: JSON.stringify({ title }),
    });
    setTodos([newTodo, ...todos]);
    setTitle("");
  }

  async function toggleTodo(id, completed) {
    await apiRequest(`/todos/${id}`, {
      method: "PUT",
      body: JSON.stringify({ completed: !completed }),
    });
    fetchTodos();
  }

  async function deleteTodo(id) {
    await apiRequest(`/todos/${id}`, { method: "DELETE" });
    setTodos(todos.filter((t) => t.id !== id));
  }

  async function logout() {
    await apiRequest("/auth/logout", { method: "POST" });
    navigate("/login");
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Your Todos</h3>
        <button className="btn btn-outline-danger" onClick={logout}>
          Logout
        </button>
      </div>

      <form onSubmit={addTodo} className="d-flex mb-4">
        <input
          type="text"
          className="form-control me-2"
          placeholder="New todo..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </form>

      {todos.length === 0 ? (
        <p className="text-muted">No todos yet.</p>
      ) : (
        <ul className="list-group">
          {todos.map((t) => (
            <li
              key={t.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <input
                  type="checkbox"
                  className="form-check-input me-2"
                  checked={!!t.completed}
                  onChange={() => toggleTodo(t.id, t.completed)}
                />
                <span
                  style={{
                    textDecoration: t.completed ? "line-through" : "none",
                  }}
                >
                  {t.title}
                </span>
              </div>
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => deleteTodo(t.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
