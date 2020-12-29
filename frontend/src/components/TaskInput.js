import React, { useState, useEffect } from "react";

import api from "../services/api";

export default function TaskInput() {
  const [list, setList] = useState([]);
  const [taskDescription, setTaskDescription ] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    api.get("/").then((response) => {
      setList(response.data);
    });
  }, []);


  async function handleAddTask(e){

    const data = {
      taskDescription,
      author
    }

    const response = await api.post('/', data)

    const task = response.data;

    setList([...list, task])
  }

   async function handleDeteleTask(id) {
    const taskId = id;
    await api.delete(`${taskId}`)

    const newList = list.filter((task) => task.id !== taskId);
    setList(newList)

  }

  return (
    <>
      <div className="card">
        {list.map((task) => (
          <>
            <p>{task.taskDescription}</p>
            <p><b>{task.author}</b></p>
            <button type="button" onClick={() => handleDeteleTask(task.id)}>Delete</button>
          </>
        ))}
      </div>
      <div className="input">
        <label>Task: 
          <input type="text" onChange={e => setTaskDescription(e.target.value)} />
        </label>

        <label>Author: 
          <input type="text" onChange={e => setAuthor(e.target.value)} />
        </label>

        <button type="button" onClick={handleAddTask}>Adicionar</button>
      </div>
    </>
  );
}
