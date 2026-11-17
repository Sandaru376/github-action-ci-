const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

// Health check (used by the test)
app.get("/health", (req, res) => res.json({ status: "ok" }));

// READ all
app.get("/todos", async (req, res) => {
  const [rows] = await db.query("SELECT * FROM todos");
  res.json(rows);
});

// CREATE
app.post("/todos", async (req, res) => {
  const { title } = req.body;
  const [result] = await db.query("INSERT INTO todos (title) VALUES (?)", [title]);
  res.json({ id: result.insertId, title });
});

// UPDATE
app.put("/todos/:id", async (req, res) => {
  const { title } = req.body;
  await db.query("UPDATE todos SET title = ? WHERE id = ?", [title, req.params.id]);
  res.json({ id: Number(req.params.id), title });
});

// DELETE
app.delete("/todos/:id", async (req, res) => {
  await db.query("DELETE FROM todos WHERE id = ?", [req.params.id]);
  res.json({ message: "Deleted" });
});

module.exports = app;
