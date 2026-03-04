require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


const PORT = process.env.SERVER_PORT || 3000;


let filmes = [
  { id: 1, title: "O Senhor dos Anéis", year: 1977 },
  { id: 2, title: "O Hobbit", year: 1980 }
];


// Rota base (teste)
app.get("/", (req, res) => {
  res.json({ message: "API a funcionar 🚀" });
});

// GET /filmes — listar todos os filmes
app.get("/filmes", (req, res) => {
  res.status(200).json({ data: filmes });
});

// GET /filmes/:id — obter um filme
app.get("/filmes/:id", (req, res) => {
  const id = Number(req.params.id);
  const filme = filmes.find(f => f.id === id);

  if (!filme) {
    return res.status(404).json({ message: "Filme não encontrado" });
  }

  res.status(200).json({ data: filme });
});

// POST /filmes — criar filme
app.post("/filmes", (req, res) => {
  const { title, year } = req.body;

  if (!title || !Number.isInteger(year)) {
    return res.status(400).json({
      message: "Title (string) e year (number) são obrigatórios"
    });
  }

  const novoFilme = {
    id: filmes.length ? filmes[filmes.length - 1].id + 1 : 1,
    title,
    year
  };

  filmes.push(novoFilme);
  res.status(201).json({ data: novoFilme });
});

// PUT /filmes/:id — atualizar filme
app.put("/filmes/:id", (req, res) => {
  console.log("PARAMS:", req.params);
  console.log("BODY:", req.body);

  const id = parseInt(req.params.id);
  const index = filmes.findIndex(f => f.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Filme não encontrado" });
  }

  const { title, year } = req.body;

  if (!title || !Number.isInteger(year)) {
    return res.status(400).json({
      message: "Title (string) e year (number) são obrigatórios"
    });
  }

  filmes[index] = { id, title, year };
  res.status(200).json({ data: filmes[index] });
});

// DELETE /filmes/:id — apagar filme
app.delete("/filmes/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = filmes.findIndex(f => f.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Filme não encontrado" });
  }

  filmes.splice(index, 1);
  res.status(200).json({ message: "Filme apagado com sucesso" });
});

// ======================
// SERVIDOR
// ======================
app.listen(PORT, () => {
  console.log(`✅ Servidor a correr em http://localhost:${PORT}`);
});