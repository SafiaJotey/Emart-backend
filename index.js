const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Addidas Running');
});

app.listen(port, () => {
  console.log('server running at port', port);
});
