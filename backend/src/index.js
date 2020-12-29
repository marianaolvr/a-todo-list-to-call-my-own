const express = require('express');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const list = [];

app.get('/', (request, response) => {
    const { author } = request.query;
    const results = author
        ? list.filter(task => task.author.includes(author))
        : list
    
    return response.json(results);
});

app.post('/', (request, response) => {
    const { taskDescription, author } = request.body;

    const task = { id: uuidv4(), taskDescription, author };
    list.push(task);

    return response.json(task)

});

app.delete('/:id', (request, response) => {
    const { id } = request.params;

    const listIndex = list.findIndex(task => 
        task.id === id);

    if (listIndex < 0) {
        return response.status(400).json({ error: 'Task not found' });
    }

    list.splice(listIndex, 1);
    
    return response.status(204).send();

})

app.listen(3333, () => {
    console.log('servidor tá on 😎️')
});