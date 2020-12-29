import React from 'react';

import api from '../services/api'

export default function TaskInput() {

    return (
        <>
        <div className="card">
            <p>Fazer xixi</p>
            <p><b>Mariana</b></p>
        </div>
        <div className="input">
            <label>Task</label>
            <input type="text"/>

            <label>Author</label>
            <input type="text"/>

            <button>Adicionar</button>
        </div>

        </>
    )
}