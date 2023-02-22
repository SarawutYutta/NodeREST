require("dotenv").config();
const express = require('express');
const app = express();

app.use(express());

let book = [
    {
        id: 1,
        title: 'Book 1',
        author: 'Author 1'
    },
    {
        id: 2,
        title: 'Book 2',
        author: 'Author 2'
    },
    {
        id: 3,
        title: 'Book 3',
        author: 'Author 3'
    },
];

app.get('/book', (req, res) => {
    const book = {
        id: books.length + 1,
        title: req.body.author
    };
    books.push(book);
    res.send(book);
});

app.put('/book/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if(!book) res.status(404).send('Book not found');
    const index = books.indexOf(book);
    books.send(book);
});


const port = process.env.PORT || 3000;
app.listen(port , () => console.log (`This is port : ${port}.....`))
