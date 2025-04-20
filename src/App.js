// import React, {useState} from 'react';
// import './App.css';

// function App() {
//   const [task, setTask] = useState("");
//   const [tasks, setTasks] = useState([]);

//   const handleAdd = () => {
//     if (task.trim() === "") return;
//     setTasks([...tasks, { text: task, completed: false }]);
//     setTask("");
//   };

//   const toggleComplete = (index) => {
//     const updated = tasks.map((t, i) =>
//       i === index ? { ...t, completed: !t.completed } : t
//     );
//     setTasks(updated);
//   };

//   const deleteTask = (index) => {
//     const updated = tasks.filter((_, i) => i !== index);
//     setTasks(updated);
//   };

//   return (
//     <div className="app">
//       <h1>React To-Do App</h1>
//       <div className="input-container">
//         <input
//           type="text"
//           placeholder="Add a new task..."
//           value={task}
//           onChange={(e) => setTask(e.target.value)}
//         />
//         <button onClick={handleAdd}>Add</button>
//       </div>

//       <ul className="task-list">
//         {tasks.map((t, i) => (
//           <li key={i} className={t.completed ? "completed" : ""}>
//             <span onClick={() => toggleComplete(i)}>{t.text}</span>
//             <button onClick={() => deleteTask(i)}>X</button>
//           </li>
//         ))}
//       </ul>
//       </div>
//   );
// }

// export default App;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    const res = await axios.get('http://localhost:3001/tasks');
    setTasks(res.data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleAdd = async () => {
    if (task.trim() === "") return;
    const res = await axios.post('http://localhost:3001/tasks', { text: task });
    setTasks([...tasks, res.data]);
    setTask("");
  };

  const toggleComplete = async (id, completed) => {
    await axios.put(`http://localhost:3001/tasks/${id}`, { completed: !completed });
    loadTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:3001/tasks/${id}`);
    loadTasks();
  };

  return (
    <div className="app">
      <h1>React To-Do App</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Add a new task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      <ul className="task-list">
        {tasks.map((t) => (
          <li key={t.id} className={t.completed ? "completed" : ""}>
            <span onClick={() => toggleComplete(t.id, t.completed)}>{t.text}</span>
            <button onClick={() => deleteTask(t.id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

