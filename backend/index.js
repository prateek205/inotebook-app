const express = require("express");
const connectToMongo = require("./db");
const cors = require('cors')

const app = express();
const port = 3002;

app.use(cors())
app.use(express.json())

connectToMongo();

app.use('/api/auth', require("./routes/auth"))
app.use('/api/notes', require("./routes/notes"))

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
