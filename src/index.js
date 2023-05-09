// use "import" to import libraries
import express from 'express';
import cors from 'cors';
import trainerRouter from './resources/trainer';

// use "require" to import JSON files
const admins = require('./data/admins.json');
const subscription = require('./resources/subscription');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use('/subscription', subscription);

const classesRouter = require('./resources/class');

app.use('/class', classesRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/admins', (req, res) => {
  res.status(200).json({
    data: admins,
  });
});

app.use('/trainer', trainerRouter);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
