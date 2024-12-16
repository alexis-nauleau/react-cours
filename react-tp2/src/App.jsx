import React, { useState } from 'react';

const App = () => {

  const [todos, setTodos] = useState([])
  const [input, setInput] = useState("")

  const addTodo = () => {
    if (input) {
      setTodos([...todos, { id: Date.now(), text: input, completed: false }])
      setInput("")
    }
  }
  return (
    <>
      <div className='min-h-screen flex items-center justify-center bg-blue-300'>
        <div className='bg-white shadow-lg rounded-3xl p-16'>
          <h1 className='text-3xl font-bold mb-6 text-center uppercase'>Liste de Tâches</h1>
          <div className='mb-4 flex'>
            <input className='flex-grow px-3 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ajouter une tâche"
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700"
              onClick={addTodo}>add</button>
          </div>

          <ul className='space y-2'>
            {todos.map((todo) => (
                <li key={todo.id} className="flex items-center p-3 rounded-lg bg-slate-100 border border-gray-200">
                  <input type="checkbox"
                    className="mr-2 h-5 w-5 text-blue-600"
                    checked={todo.completed}
                    onChange={() => setTodos(
                      todos.map((element) => (
                        element.id === todo.id ? { ...element, completed: !element.completed } : element
                      ))
                    )} />
                  <span className={`flex-grow ${todo.completed ? "line-through text-gray-500":"text-gray-900"}`}>{todo.text}</span>
                  <button
                    onClick={()=>setTodos(todos.filter(
                      (element)=> element.id !== todo.id
                    ))}
                    className='ml-2 border-none p-2 rounded-lg bg-red-500 text-white hover:bg-red-700 '>
                      Supprimer</button>
                </li>
            ) 
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default App;