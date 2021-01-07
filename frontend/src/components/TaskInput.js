import React, { useState, useEffect } from "react";

import api from "../services/api";
import "./TaskInput.css";

export default function TaskInput() {
  const [list, setList] = useState([]);
  const [taskDescription, setTaskDescription] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    api.get("/").then((response) => {
      setList(response.data);
    });
  }, []);

  async function handleAddTask(e) {
    const data = {
      taskDescription,
      author,
    };

    const response = await api.post("/", data);

    const task = response.data;

    setList([...list, task]);
  }

  async function handleDeteleTask(id) {
    const taskId = id;
    await api.delete(`${taskId}`);

    const newList = list.filter((task) => task.id !== taskId);
    setList(newList);
  }

  return (
    <div className="content">
      <div className="list">
        <div className="card">
          {list.map((task) => (
            <>
              <p>{task.taskDescription}</p>
              <p>
                <b>{task.author}</b>
              </p>
              <button type="button" onClick={() => handleDeteleTask(task.id)}>
                Delete
              </button>
            </>
          ))}
        </div>
      </div>
      <div className="addTask">
        <div className="input">

          <label for="task">TAREFA</label>
          <input type="text" onChange={(e) => setTaskDescription(e.target.value)} id="task" />

          <label for="author">AUTOR</label>
          <input type="text" onChange={(e) => setAuthor(e.target.value)} id="author"/>

          <button type="button" className="addButton" onClick={handleAddTask}>
            Adicionar
        </button>
        </div>
      </div>
    </div>
  );
}
