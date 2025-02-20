const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        db.run(`
            CREATE TABLE IF NOT EXISTS items (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                description TEXT,
                category TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
    }
});

app.get('/items', (req, res) => {
    db.all('SELECT * FROM items', [], (err, rows) => {
        if (err) {
            console.error('Error fetching items:', err.message);
            res.status(500).json({ error: err.message });
            return;
        }

        console.log('Fetched items:', rows);  

        res.json(rows);
    });
});

app.post('/items', (req, res) => {
    const { name, description, category } = req.body;
    console.log('Received POST data:', req.body);

    db.run('INSERT INTO items (name, description, category) VALUES (?, ?, ?)', 
        [name, description, category], 
        function (err) {
            if (err) {
                console.error('Error inserting item:', err.message);
                res.status(500).json({ error: err.message });
                return;
            }
            const newItem = {
                id: this.lastID,
                name: name,
                description: description,
                category: category
            };
            res.json(newItem);  
        }
    );
});



app.delete('/items/:id', (req, res) => {
    db.run('DELETE FROM items WHERE id = ?', req.params.id, function (err) {
        if (err) {
            console.error('Error deleting item:', err.message);
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Item deleted' });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
