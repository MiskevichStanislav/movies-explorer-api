require('dotenv').config();
const express = require('express');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const routes = require('./routes');
const { addressMongoDB } = require('./utils/constants');
const cors = require('./middlewares/cors');
const error = require('./middlewares/error');
const limiter = require('./middlewares/limiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect(addressMongoDB);
app.use(cors);
app.use(helmet());
app.use(requestLogger);
app.use(limiter);
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(error);

app.listen(PORT);
