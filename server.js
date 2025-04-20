const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.static('public'));
app.use(express.json());

app.get('/items', (req, res) => {
  const items = fs.readFileSync('items.txt', 'utf-8')
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean);
  res.json(items);
});

app.post('/save', (req, res) => {
  const { user, sorted } = req.body;
  const safeName = user.replace(/[^a-z0-9]/gi, '_').toLowerCase();
  fs.writeFileSync(`sorted_${safeName}.txt`, sorted.join('\n'));
  res.sendStatus(200);
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
