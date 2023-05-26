const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./app');

dotenv.config();

mongoose.connect(
  process.env.DB_URL,
  { maxPoolSize: process.env.MONGO_POOLSIZE || 1 },
)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log('Error: ', error));

try {
  app.listen(process.env.PORT, (err) => {
    if (err) throw err;
    console.log(`server listening on port ${process.env.PORT}`);
  });
} catch (err) {
  console.log('There was an error starting the server', err);
}
