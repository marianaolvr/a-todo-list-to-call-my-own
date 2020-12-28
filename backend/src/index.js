const express = require('express');

const app = express();

app.use(express.json());

app.get('/', (request, response) => {
    return response.json({ message: 'olá, mundo' })
});

app.listen(3333, () => {
    console.log('servidor tá on 😎️')
});