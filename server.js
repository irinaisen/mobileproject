
const path = require(`path`);
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/App.js'));
  });

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

