// Load Environment Variables from the .env file
require('dotenv').config();

// Application Dependencies
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const client = require('./lib/client');

// Database Client
client.connect();

// Application Setup
const app = express();
const PORT = process.env.PORT;
app.use(morgan('dev')); // http logging
app.use(cors()); // enable CORS request
app.use(express.static('public')); // enable serving files from public
app.use(express.json()); // enable reading incoming json data

app.get('/api/items', (req, res) => {
    const showAll = (req.query.show && req.query.show.toUpperCase() === 'all');
    const where = showAll ? '' : 'WHERE inactive = FALSE';
    
    client.query(`
        SELECT
            id,
            name,
            inactive
        FROM items
        ${where}
        ORDER BY name;
    `)
        .then(result => {
            res.json(result.rows);
        })
        .catch(err => {
            res.status(500).json({
                error: err.message || err
            });
        });   
});

app.post('/api/items', (req, res) => {
    const type = req.body;
    client.query(`
        INSERT INTO items (name)
        VALUES ($1)
        RETURNING *;
    `,
    [type.name]
    )
        .then(result => {
            res.json(result.rows[0]);
        })
        .catch(err => {
            if(err.code === '23505') {
                res.status(400).json({
                    error: `Type "${type.name}" already exists`
                });
            }
            res.status(500).json({
                error: err.message || err
            });
        }); 
});

app.put('/api/items/:id', (req, res) => {
    const id = req.params.id;
    const item = req.body;

    client.query(`
        UPDATE items
        SET    name = $2,
            inactive = $3
        WHERE  id = $1
        RETURNING *;
    `,
    [id, item.name, item.inactive]
    )
        .then(result => {
            res.json(result.rows[0]);
        })
        .catch(err => {
            if(err.code === '23505') {
                res.status(400).json({
                    error: `Item "${item.name}" already exists`
                });
            }
            res.status(500).json({
                error: err.message || err
            });
        }); 
});

app.delete('/api/items/:id', (req, res) => {
    const id = req.params.id;

    client.query(`
        DELETE FROM items
        WHERE  id = $1
        RETURNING *;
    `,
    [id]
    )
        .then(result => {
            res.json(result.rows[0]);
        })
        .catch(err => {
            if(err.code === '23503') {
                res.status(400).json({
                    error: `Could not remove, item is in use. Make inactive or delete all entries with that item first.`
                });
            }
            res.status(500).json({
                error: err.message || err
            });
        }); 
});

// Start the server
app.listen(PORT, () => {
    console.log('server running on PORT', PORT);
});