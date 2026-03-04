require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const PORT = process.env.SERVER_PORT || 4242;

// ======================
// DADOS MOCK (EM MEMÓRIA)
// ======================
let users = [
  { id: 1, name: "Ana", email: "ana@email.com" },
  { id: 2, name: "João", email: "joao@email.com" }
];

// ======================
// ROTAS
// ======================

// Rota base (teste)
app.get("/", (req, res) => {
  res.json({ message: "API a funcionar 🚀" });
});

// GET /users — listar todos
app.get("/users", (req, res) => {
  res.status(200).json({ data: users });
});

// GET /users/:id — obter um utilizador
app.get("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ message: "Utilizador não encontrado" });
  }

  res.status(200).json({ data: user });
});

// POST /users — criar utilizador
app.post("/users", (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Name e email são obrigatórios" });
  }

  const newUser = {
    id: users.length ? users[users.length - 1].id + 1 : 1,
    name,
    email
  };

  users.push(newUser);
  res.status(201).json({ data: newUser });
});

// PUT /users/:id — atualizar utilizador
app.put("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex(u => u.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Utilizador não encontrado" });
  }

  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Name e email são obrigatórios" });
  }

  users[index] = { id, name, email };
  res.status(200).json({ data: users[index] });
});

// DELETE /users/:id — apagar utilizador
app.delete("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex(u => u.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Utilizador não encontrado" });
  }

  users.splice(index, 1);
  res.status(200).json({ message: "Utilizador apagado com sucesso" });
});

// ======================
// SERVIDOR
// ======================
app.listen(PORT, () => {
  console.log(`✅ Servidor a correr em http://localhost:${PORT}`);
});