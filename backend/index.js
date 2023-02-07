const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./db');
const bodyParser = require('body-parser');
const AD = require('./routes/AllData');

const port = 7000

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/v1/api', AD);

app.listen(port, async() => {
  await db();
  console.log(`Example app listening on port ${port}`)
})