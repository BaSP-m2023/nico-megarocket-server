const express = require('express');
const cors = require('cors');
const router = require('./routes');
const fileSizeManage = require('./middlewares/fileSizeMiddleware');

const app = express();

app.use(fileSizeManage);
app.use(cors());
app.use(express.json());
app.use('/api', router);

module.exports = app;
