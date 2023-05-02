const express = require('express');
const cors = require('cors');
const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
    return res.send(`
        <style>
            .header {
                color: #fff;
                background: #008080;
            }
        </style>
        <h1 class="header">karthick is awesome</h1>
        <p>server started and running successfully!</p>
    `);
});

let data = [
    { id: 'vgd56-8dksd-89sdjd-s9djnm', text: 'welcome, welcome, welcome' },
];

app.get('/data', (req, res) => {
    return res.json({ data });
});

app.get('/data/:id', (req, res) => {
    const text = data.find((dt) => dt.id === req.params.id);
    return res.json({ text });
});

app.post('/data', (req, res) => {
    const { text } = req.body;
    if (!text) return res.status(400).json({ msg: 'illegal data' });

    const created = {
        id: uuid(),
        text,
    };

    data.push(created);
    return res.status(201).json({ created });
});

app.delete('/data/:id', (req, res) => {
    const id = req.params.id;
    data = data.filter((dt) => dt.id !== id);
    return res.json({ msg: 'deleted!' });
});

app.put('/data/:id', (req, res) => {
    const id = req.params.id;
    const { text } = req.body;

    data = data.map((dt) => {
        if (dt.id === id) {
            return {
                ...dt,
                text,
            };
        }
        return dt;
    });
    return res.json({ msg: 'edited' });
});

app.listen(5000, () => console.log('server started!'));
