const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
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

app.listen(5000, () => console.log('server started!'));
