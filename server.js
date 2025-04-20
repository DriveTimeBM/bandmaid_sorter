const express = require('express');
const fs = require('fs');
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

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
