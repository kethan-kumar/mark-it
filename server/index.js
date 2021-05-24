const express = require ("express");
const path = require ('path')

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.static(path.resolve(__dirname, '../markit/build')));

app.get("/ping_server", (req, res) => {
    res.json({ message: "Hello from NodeJS!" });
  });
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../markit/build', 'index.html'));
  });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});