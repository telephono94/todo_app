const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const FILE = './todos.json';

function readTodos() {
  if (!fs.existsSync(FILE)) return [];
  return JSON.parse(fs.readFileSync(FILE));
}

function saveTodos(todos) {
  fs.writeFileSync(FILE, JSON.stringify(todos, null, 2));
}

app.get('/todos', (req, res) => {
  res.json(readTodos());
});

app.post('/todos', (req, res) => {
  const todos = readTodos();
  const newTodo = req.body.text;
  if (!newTodo) return res.status(400).json({ error: 'Kein Text angegeben' });

  todos.push(newTodo);
  saveTodos(todos);
  res.status(201).json({ success: true });
});

app.delete('/todos/:index', (req, res) => {
  const index = parseInt(req.params.index);
  const todos = readTodos();

  if (index < 0 || index >= todos.length) return res.status(404).json({ error: 'Nicht gefunden' });

  todos.splice(index, 1);
  saveTodos(todos);
  res.json({ success: true });
});

app.listen(3000, () => {
  console.log('Backend läuft unter http://localhost:3000');
});

