import { useState, useEffect } from "react";

const API = "http://localhost:5000/todos";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null);

  const loadTodos = async () => {
    const res = await fetch(API);
    setTodos(await res.json());
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const handleSubmit = async () => {
    if (!title.trim()) return;

    if (editId) {
      // UPDATE
      await fetch(`${API}/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });
      setEditId(null);
    } else {
      // CREATE
      await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });
    }
    setTitle("");
    loadTodos();
  };

  const handleDelete = async (id) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    loadTodos();
  };

  const handleEdit = (todo) => {
    setEditId(todo.id);
    setTitle(todo.title);
  };

  return (
    <div style={{ maxWidth: 400, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h1>Todo CRUD</h1>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter todo"
      />
      <button onClick={handleSubmit}>{editId ? "Update" : "Add"}</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.title}{" "}
            <button onClick={() => handleEdit(todo)}>Edit</button>{" "}
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
