const express = require('express');
const sqlite3 = require('sqlite3');
const app = express();

// connect to database
const db = new sqlite3.Database('./Database/Book.sqlite');

// parse incoming requests
app.use(express.json());

// create books table if it doesn't exist
db.run(`CREATE TABLE IF NOT EXISTS book (
    id INTEGER PRIMARY KEY,
    title TEXT,
    author TEXT
)`);

// route to get all books 
app.get('/book/:id', (req, res) => {
    db.all('SELECT * FROM book', (err, rows) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(rows);
        }
    });
});



app.get('/book/:id', (req, res) => {
    db.get('SELECT * FROM books WHERE id = ?', req.params.id, (err, row) => {
        if (err) {
            res.status(500).send(err);
        } else {
            if (!row) {
                res.status(400).send('Book not found');
            } else {
                res.jos(row);
            }
        }
    });
});

app.post('/book', (req, res) => {
    const book = req.body;
    db.run('INSERT INTO books (title, author) VALUES (? ?)', book.title, book.author, function(err){
        if (err) {
            res.status(500).send(err);
        } else{
            book.id = this.lastID;
            res.send(book);
        }
    });
});

app.post('/book/:id',(req, res) => {
    const book = req.body;
    db.run('UPDATE books SET title = ?, author = ? WHERE id = ?', book.title, book.author, req.params.id, function(err) {
        if (err) {
            res.status(500).send(err);
        }else{
            res.send(book);
        }
    });
});

app.delete('/book/:id',(req, res) => {
    db.run('DELETE FROM books WHERE id = ?', req.params.id, function(err) {
        if (err) {
            res.status(500).send(err);
        }else{
            res.send({});
        }
    });
});

const port = process.env.POST || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
