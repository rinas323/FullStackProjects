import React, { useState } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const addTodo = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setTodos([...todos, { id: Date.now(), title: input, completed: false }]);
    setInput('');
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">📝 Todo App</h1>
      <div className="card shadow-sm">
        <div className="card-body">
          <form className="d-flex mb-3" onSubmit={addTodo}>
            <input
              type="text"
              className="form-control me-2"
              placeholder="Add a new task..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">Add</button>
          </form>
          <ul className="list-group">
            {todos.map(todo => (
              <li key={todo.id} className={`list-group-item d-flex justify-content-between align-items-center ${todo.completed ? 'list-group-item-success' : ''}`}>
                <span>{todo.title}</span>
                <div>
                  <button className="btn btn-sm btn-success me-2" onClick={() => toggleComplete(todo.id)}>
                    {todo.completed ? 'Undo' : 'Done'}
                  </button>
                  <button className="btn btn-sm btn-danger" onClick={() => deleteTodo(todo.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;

