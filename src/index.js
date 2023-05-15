const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const router = require('./routes');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const DB_URL = 'mongodb+srv://nico-team:UcLQ3ogL9TCSIMH2@megarocket-databases.inpprte.mongodb.net/nico-database';

mongoose
  .connect(DB_URL)
<<<<<<< HEAD
// eslint-disable-next-line no-console
  .then(() => console.log('Db connected'))
// eslint-disable-next-line no-console
=======
  // eslint-disable-next-line no-console
  .then(() => console.log('Db connected'))
  // eslint-disable-next-line no-console
>>>>>>> 6ee9a1ddc60cb7d4e64e267abc9a0a803f6f84a6
  .catch((error) => console.log('Error : ', error));

app.use('/api', router);

app.listen(port, () => {
// eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
