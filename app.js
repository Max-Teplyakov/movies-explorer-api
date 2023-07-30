require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const rateLimiter = require('./middlewares/rateLimiter');
const InternalServerError = require('./errors/InternalServerError');

const app = express();
const routes = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { PORT_DEV, DB_URL_DEV } = require('./utils/configuration');

const { PORT = PORT_DEV, DB_URL = DB_URL_DEV } = process.env;
app.use(cors());

app.use(express.json());

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(requestLogger);
app.use(rateLimiter);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(routes);
app.use(errorLogger);

app.use(errors());
app.use(InternalServerError);

app.listen(PORT, () => {

});
