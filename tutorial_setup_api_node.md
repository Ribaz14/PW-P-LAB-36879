![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)
![dotenv](https://img.shields.io/badge/.ENV-ECD53F?style=for-the-badge&logo=dotenv&logoColor=black)

# 🚀 Tutorial — Setup de uma API em Node.js

---
## Unidade Curricular: Programação Web  
Curso: Tecnologias e Programação de Sistemas de Informação  
Instituição: IPVC — Escola Superior de Tecnologia e Gestão  
Ano Letivo: 2025-2026  

### Docentes
Célia Soares (P)  
Email: celiasoares@estg.ipvc.pt  

Marcelo Antunes Fernandes (Docente Responsável - T)  
Email: fernandesmarcelo@estg.ipvc.pt  

---

# � Índice

1. [Objetivo](#-objetivo)
2. [Setup Inicial](#️-setup-inicial)
3. [Estrutura do Projeto](#-estrutura-do-projeto)
4. [node_modules](#-node_modules)
5. [.gitignore](#-gitignore-completo)
6. [package.json — Scripts](#-packagejson--scripts)
7. [.env](#-env)
8. [server.js Base](#-serverjs-base)
9. [Exemplo 1 — Apenas OK](#-exemplo-1--apenas-ok)
10. [req e res](#-req)
11. [HTTP Status Codes](#-http-status-codes)
12. [Exemplo 2 — CRUD com Mock](#️-exemplo-2--crud-com-mock)
13. [Middleware de Erros](#-middleware-de-erros)
14. [Testar com Postman](#-testar-com-postman)
15. [Deploy no Vercel](#️-deploy-no-vercel)
16. [LAB-1 — API Gestão de Filmes](#-lab-1--api-gestão-de-filmes-)
17. [LAB-2 — API Gestão de Tarefas](#-lab-2--api-gestão-de-tarefas-)
18. [Glossário](#-glossário)
19. [Recursos Úteis](#-recursos-úteis)

---

# �📌 Objetivo

Criar uma API simples em Node.js com Express com:

- GET
- POST
- PUT
- DELETE
- Dados mock (em memória)
- Tudo no server.js

Compreender:
- node_modules
- endpoint
- req e res
- deploy

---

# 🛠️ Setup Inicial

Criar repositório:
PW-P-LAB-{{numero-de-aluno}}

Instalar Node:
https://nodejs.org/en

Confirmar:
node -v
npm -v

Inicializar:
npm init

Instalar dependências:
npm install express nodemon cors dotenv morgan --save

---

# � Estrutura do Projeto

Após o setup, o projeto deverá ter a seguinte estrutura:

```
PW-P-LAB-{{numero-de-aluno}}/
├── node_modules/         # Dependências (NÃO enviar para GitHub)
├── .env                  # Variáveis de ambiente
├── .gitignore            # Ficheiros a ignorar pelo Git
├── package.json          # Configurações e dependências do projeto
├── package-lock.json     # Versões exatas das dependências
├── server.js             # Ficheiro principal da API
├── vercel.json           # Configuração do deploy na Vercel
└── README.md             # Documentação do projeto
```

> 💡 **Dica:** Manter uma boa estrutura de projeto desde o início facilita a manutenção e colaboração.

---

# �📦 node_modules

Criada automaticamente com:
npm install

Contém todas as bibliotecas.

Não enviar para GitHub.
Adicionar ao .gitignore:
node_modules

---

# 🚫 .gitignore Completo

Criar um ficheiro `.gitignore` na raiz do projeto com o seguinte conteúdo:

```
# Dependências
node_modules/

# Variáveis de ambiente
.env

# Logs
logs/
*.log
npm-debug.log*

# Sistema operativo
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/

# Vercel
.vercel/
```

> ⚠️ **Importante:** O ficheiro `.env` contém informações sensíveis (passwords, tokens, etc.) e **nunca** deve ser enviado para o GitHub.

---

# 📋 package.json — Scripts

Após o `npm init`, o `package.json` é criado. Adicionar os seguintes **scripts**:

```json
{
  "name": "pw-p-lab",
  "version": "1.0.0",
  "description": "API REST - Programação Web",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "keywords": ["api", "express", "node"],
  "author": "O teu nome",
  "license": "ISC"
}
```

| Script | Comando | Descrição |
|--------|---------|---------- |
| `start` | `npm start` | Inicia o servidor com Node (produção) |
| `dev` | `npm run dev` | Inicia com Nodemon — reinicia automaticamente ao guardar ficheiros |

> 💡 **Nodemon** vigia os ficheiros e reinicia o servidor automaticamente sempre que detetar alterações. Ideal para desenvolvimento.

Para correr em modo de desenvolvimento:
```bash
npm run dev
```

---

# 🌱 .env

SERVER_PORT=4242

---

# 📄 server.js Base

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const PORT = process.env.SERVER_PORT || 3000;

---

# 🧪 EXEMPLO 1 — Apenas OK

app.get("/users", (req, res) => {
  res.status(200).json({ message: "OK - GET users" });
});

app.post("/users", (req, res) => {
  res.status(200).json({ message: "OK - POST users" });
});

app.put("/users/:id", (req, res) => {
  res.status(200).json({ message: "OK - PUT users" });
});

app.delete("/users/:id", (req, res) => {
  res.status(200).json({ message: "OK - DELETE users" });
});

---

# 🧠 req

Request.
Contém:
req.params
req.body
req.query

---

# 📤 res

Response.
Envia dados ao cliente:

res.status(200).json({ message: "OK" });

### Métodos mais usados de `res`:

| Método | Descrição | Exemplo |
|--------|-----------|---------- |
| `res.json()` | Envia resposta JSON | `res.json({ name: "Ana" })` |
| `res.status()` | Define o status code | `res.status(201)` |
| `res.send()` | Envia texto simples | `res.send("Hello")` |
| `res.redirect()` | Redireciona | `res.redirect("/home")` |

---

# 📊 HTTP Status Codes

Tabela de referência dos códigos HTTP mais comuns:

| Código | Nome | Descrição | Quando usar |
|--------|------|-----------|------------|
| **200** | OK | Sucesso | GET, PUT com sucesso |
| **201** | Created | Recurso criado | POST com sucesso |
| **204** | No Content | Sem conteúdo | DELETE com sucesso |
| **400** | Bad Request | Pedido inválido | Dados em falta ou inválidos |
| **404** | Not Found | Não encontrado | Recurso não existe |
| **409** | Conflict | Conflito | Recurso duplicado |
| **500** | Internal Server Error | Erro interno | Erro inesperado no servidor |

### Categorias:

| Gama | Significado |
|------|------------|
| `1xx` | Informacional |
| `2xx` | ✅ Sucesso |
| `3xx` | Redirecionamento |
| `4xx` | ❌ Erro do Cliente |
| `5xx` | 💥 Erro do Servidor |

---

# 🗂️ EXEMPLO 2 — CRUD com Mock

```js
let users = [
  { id: 1, name: "Ana", email: "ana@email.com" },
  { id: 2, name: "João", email: "joao@email.com" }
];
```

### GET /users — Listar todos

```js
app.get("/users", (req, res) => {
  res.status(200).json({ data: users });
});
```

### GET /users/:id — Obter um

```js
app.get("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({ message: "Utilizador não encontrado" });
  }

  res.status(200).json({ data: user });
});
```

### POST /users — Criar

```js
app.post("/users", (req, res) => {
  const { name, email } = req.body;

  // Validação
  if (!name || !email) {
    return res.status(400).json({ message: "Campos 'name' e 'email' são obrigatórios" });
  }

  const newUser = {
    id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
    name,
    email
  };

  users.push(newUser);
  res.status(201).json({ data: newUser });
});
```

### PUT /users/:id — Atualizar

```js
app.put("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex((u) => u.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Utilizador não encontrado" });
  }

  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Campos 'name' e 'email' são obrigatórios" });
  }

  users[index] = { id, name, email };
  res.status(200).json({ data: users[index] });
});
```

### DELETE /users/:id — Apagar

```js
app.delete("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex((u) => u.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Utilizador não encontrado" });
  }

  users.splice(index, 1);
  res.status(200).json({ message: "Utilizador eliminado com sucesso" });
});
```

### Iniciar o servidor

```js
app.listen(PORT, () => {
  console.log(`✅ Servidor a correr em http://localhost:${PORT}`);
});
```

> 💡 Este bloco `app.listen()` deve estar **sempre no final** do ficheiro `server.js`.

---

# 🛡️ Middleware de Erros

Adicionar no final do `server.js` (antes do `app.listen`):

```js
// Rota não encontrada (404)
app.use((req, res) => {
  res.status(404).json({ message: "Rota não encontrada" });
});

// Middleware de erro global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Erro interno do servidor" });
});
```

Ordem recomendada no `server.js`:
1. Imports e configuração
2. Middlewares (`cors`, `json`, `morgan`)
3. Rotas (GET, POST, PUT, DELETE)
4. Middleware de erros (404 e 500)
5. `app.listen()`

---

# 🧪 Testar com Postman

O **Postman** é uma ferramenta para testar APIs sem precisar de frontend.

### Instalação
Descarregar em: https://www.postman.com/downloads/

### Como testar cada endpoint:

#### 1. GET — Listar todos os utilizadores
| Campo | Valor |
|-------|-------|
| Método | `GET` |
| URL | `http://localhost:4242/users` |
| Body | Nenhum |

#### 2. GET — Obter um utilizador
| Campo | Valor |
|-------|-------|
| Método | `GET` |
| URL | `http://localhost:4242/users/1` |
| Body | Nenhum |

#### 3. POST — Criar utilizador
| Campo | Valor |
|-------|-------|
| Método | `POST` |
| URL | `http://localhost:4242/users` |
| Body → raw → JSON | Ver abaixo |

```json
{
  "name": "Maria",
  "email": "maria@email.com"
}
```

#### 4. PUT — Atualizar utilizador
| Campo | Valor |
|-------|-------|
| Método | `PUT` |
| URL | `http://localhost:4242/users/1` |
| Body → raw → JSON | Ver abaixo |

```json
{
  "name": "Ana Silva",
  "email": "ana.silva@email.com"
}
```

#### 5. DELETE — Apagar utilizador
| Campo | Valor |
|-------|-------|
| Método | `DELETE` |
| URL | `http://localhost:4242/users/2` |
| Body | Nenhum |

> 💡 **Dica:** Criar uma **Collection** no Postman para organizar todos os pedidos do projeto.

---

# ☁️ Deploy no Vercel

Criar conta em:
https://vercel.com

Instalar CLI:
npm install -g vercel

Login:
vercel login

Deploy:
vercel

### Ficheiro `vercel.json`

Criar o ficheiro `vercel.json` na raiz do projeto:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "server.js"
    }
  ]
}
```

### Exportar o `app` para a Vercel

No final do `server.js`, alterar o `app.listen()` para:

```js
// Para desenvolvimento local
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`✅ Servidor a correr em http://localhost:${PORT}`);
  });
}

// Para a Vercel
module.exports = app;
```

> ⚠️ **Nota:** A Vercel precisa que o `app` seja exportado com `module.exports`. O `app.listen()` só deve correr localmente.

---

# 🧪 LAB-1 — API Gestão de Filmes 🎬

Criar array:

let movies = [
  { id: 1, title: "Inception", year: 2010 },
  { id: 2, title: "Interstellar", year: 2014 }
];

Implementar:
GET /movies
GET /movies/:id
POST /movies
PUT /movies/:id
DELETE /movies/:id

Requisitos:
- Dados mock
- Validar ID
- Status codes corretos
- Testar no Postman

---

---

# 🧪 LAB-2 — API Gestão de Tarefas ✅

Criar array:

```js
let tasks = [
  { id: 1, title: "Estudar Node.js", completed: false, priority: "high" },
  { id: 2, title: "Fazer LAB-1", completed: true, priority: "medium" }
];
```

Implementar:
- `GET /tasks` — Listar todas as tarefas
- `GET /tasks/:id` — Obter uma tarefa
- `GET /tasks?completed=true` — Filtrar por estado (usar `req.query`)
- `POST /tasks` — Criar tarefa
- `PUT /tasks/:id` — Atualizar tarefa
- `PATCH /tasks/:id/toggle` — Alternar estado `completed`
- `DELETE /tasks/:id` — Apagar tarefa

Requisitos:
- Dados mock
- Validar campos obrigatórios (`title`, `priority`)
- Validar que `priority` seja `"low"`, `"medium"` ou `"high"`
- Status codes corretos (200, 201, 400, 404)
- Testar todos os endpoints no Postman
- Fazer deploy na Vercel

> 💡 **Desafio extra:** Implementar `GET /tasks/stats` que retorna o número total de tarefas, quantas estão completas e quantas estão pendentes.

---

# 🎯 Fim


---

# 📘 Explicação Detalhada da Configuração

## 🌱 O que é o ficheiro `.env`?

```
SERVER_PORT=4242
```

O ficheiro `.env` (environment file) serve para guardar **variáveis de ambiente**.

Estas variáveis:

- Guardam configurações do projeto
- Não ficam escritas diretamente no código
- Permitem alterar valores sem modificar o programa
- São muito usadas para portas, passwords, tokens e configurações de base de dados

No nosso caso:

`SERVER_PORT=4242`  
Define a porta onde o servidor vai arrancar.

---

## 📄 Explicação do `server.js` Base

```js
require("dotenv").config();
```

Carrega o ficheiro `.env` e disponibiliza as variáveis através de:

```js
process.env.NOME_DA_VARIAVEL
```

---

```js
const express = require("express");
```

Importa o **Express**, que é o framework que usamos para criar a API.

---

```js
const cors = require("cors");
```

Importa o **CORS**.

CORS significa *Cross-Origin Resource Sharing*.

Permite que a nossa API possa ser chamada por aplicações externas (por exemplo, um frontend em React).

---

```js
const morgan = require("morgan");
```

Importa o **Morgan**, que serve para mostrar no terminal:

- Tipo de pedido (GET, POST, etc.)
- URL chamada
- Tempo de resposta
- Status code

Ajuda muito no debugging.

---

```js
const app = express();
```

Cria a aplicação Express.

É aqui que vamos definir os endpoints.

---

```js
app.use(cors());
```

Ativa o CORS para todas as rotas.

---

```js
app.use(express.json());
```

Permite que a API receba dados em formato JSON no body dos pedidos (POST e PUT).

Sem esta linha, `req.body` não funcionaria.

---

```js
app.use(morgan("dev"));
```

Ativa o Morgan no modo "dev".

Mostra logs simples e organizados no terminal.

---

```js
const PORT = process.env.SERVER_PORT || 3000;
```

Define a porta do servidor.

- Primeiro tenta ler do `.env`
- Se não existir, usa 3000 como valor por defeito

Isto permite flexibilidade entre desenvolvimento e produção.

---

# 📖 Glossário

| Termo | Definição |
|-------|----------|
| **API** | Application Programming Interface — conjunto de endpoints que permitem comunicação entre sistemas |
| **REST** | Representational State Transfer — arquitetura para APIs baseada em recursos e métodos HTTP |
| **Endpoint** | URL específica que responde a pedidos HTTP (ex: `/users`) |
| **Middleware** | Função que interceta o pedido antes de chegar à rota final |
| **CRUD** | Create, Read, Update, Delete — as 4 operações básicas |
| **Mock** | Dados simulados em memória para testes |
| **Rota** | Combinação de método HTTP + URL (ex: `GET /users`) |
| **Body** | Corpo do pedido HTTP, usado em POST e PUT para enviar dados |
| **Params** | Parâmetros na URL (ex: `/users/:id` → `req.params.id`) |
| **Query** | Parâmetros de consulta na URL (ex: `/users?name=Ana` → `req.query.name`) |
| **Status Code** | Código numérico que indica o resultado do pedido (200, 404, 500...) |
| **JSON** | JavaScript Object Notation — formato de dados usado nas APIs |
| **Deploy** | Publicar a aplicação num servidor acessível pela internet |
| **Nodemon** | Ferramenta que reinicia automaticamente o servidor ao detetar alterações nos ficheiros |
| **CORS** | Cross-Origin Resource Sharing — permite pedidos de origens diferentes |
| **dotenv** | Biblioteca para carregar variáveis de ambiente a partir do ficheiro `.env` |

---

# 🔗 Recursos Úteis

| Recurso | Link |
|---------|------|
| Documentação Node.js | https://nodejs.org/docs/latest/api/ |
| Documentação Express | https://expressjs.com/ |
| Postman Learning | https://learning.postman.com/ |
| Vercel Docs | https://vercel.com/docs |
| HTTP Status Codes | https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status |
| REST API Tutorial | https://restfulapi.net/ |
| Nodemon | https://nodemon.io/ |
| Shields.io (badges) | https://shields.io/ |
| GitHub Student Pack | https://education.github.com/pack |
| MDN Web Docs | https://developer.mozilla.org/pt-BR/ |

---

