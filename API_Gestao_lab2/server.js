require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


const PORT = process.env.SERVER_PORT || 3000;


let tasks = [
    { id: 1, title: "Estudar Node.js", completed: false, priority: "high" },
    { id: 2, title: "Fazer LAB-1", completed: true, priority: "medium" }
];


// Rota base (teste)
app.get("/", (req, res) => {
  res.json({ message: "API a funcionar 🚀" });
});

// GET /tasks — listar todas as tarefas
app.get("/tasks", (req, res) => {
  res.status(200).json({ data: tasks });
});

// GET /tasks/:id — obter uma task
app.get("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const filme = tasks.find(f => f.id === id);

  if (!filme) {
    return res.status(404).json({ message: "Task não encontrada" });
  }

  res.status(200).json({ data: filme });
});

// POST /tasks — criar task
app.post("/tasks", (req, res) => {
  const { title, completed, priority } = req.body;

  if (!title || typeof completed !== "boolean" || !priority) {
    return res.status(400).json({
      message: "Title (string), completed (boolean), e priority (string) são obrigatórios"
    });
  }

  const novoTasks = {
    id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
    title,
    completed,
    priority
  };

  tasks.push(novoTasks);
  res.status(201).json({ data: novoTasks });
});

// PUT /tasks/:id — atualizar task
app.put("/tasks/:id", (req, res) => {
  console.log("PARAMS:", req.params);
  console.log("BODY:", req.body);

  const id = parseInt(req.params.id);
  const index = tasks.findIndex(f => f.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Task não encontrada" });
  }

  const { title, completed, priority } = req.body;

  if (!title || typeof completed !== "boolean" || !priority) {
    return res.status(400).json({
      message: "Title (string), completed (boolean), e priority (string) são obrigatórios"
    });
  }

  tasks[index] = { id, title, completed, priority };
  res.status(200).json({ data: tasks[index] });
});

// DELETE /tasks/:id — apagar task
app.delete("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = tasks.findIndex(f => f.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Task não encontrada" });
  }

  tasks.splice(index, 1);
  res.status(200).json({ message: "Task apagada com sucesso" });
});

// ======================
// SERVIDOR
// ======================
app.listen(PORT, () => {
  console.log(`✅ Servidor a correr em http://localhost:${PORT}`);
});