const list = document.getElementById("todo-list");
const input = document.getElementById("todo-input");

function fetchTodos() {
  fetch('http://localhost:3000/todos')
    .then(res => res.json())
    .then(todos => {
      list.innerHTML = "";
      todos.forEach((todo, index) => addTodoToList(todo, index));
    });
}

function addTodo() {
  const text = input.value.trim();
  if (!text) return;

  fetch('http://localhost:3000/todos', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text })
  }).then(() => {
    input.value = "";
    fetchTodos();
  });
}

function deleteTodo(index) {
  fetch(`http://localhost:3000/todos/${index}`, {
    method: "DELETE"
  }).then(() => fetchTodos());
}

function addTodoToList(text, index) {
  const li = document.createElement("li");
  li.textContent = text;

  const btn = document.createElement("button");
  btn.textContent = "X";
  btn.onclick = () => deleteTodo(index);

  li.appendChild(btn);
  list.appendChild(li);
}

fetchTodos();


  