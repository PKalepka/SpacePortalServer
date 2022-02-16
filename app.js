const dotenv = require('dotenv').config({
  path: './config/.env',
  debug: process.env.DEBUG,
});
const express = require('express');
const cors = require('cors');
const app = express();
const FeedApi = require('./services/feedService');
const baseRepository = require('./repository/baseRepository');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app
  //returns either online NASA API content or database cached result if it already exists
  .route('/neo/feed')
  .get(async (req, res) => {
    const startDate = req.query.start_date;
    const endDate = req.query.end_date;

    var content = await new FeedApi().neoFeed(startDate, endDate);
    res.status(200).send(JSON.stringify(content));
    return content;
  });

const server = app.listen(process.env.DEV_SERVICE_PORT, process.env.DEV_SERVICE_HOST, () => {
  if (dotenv.error) {
    console.log(`dotenv error: ${dotenv.error}`);
  }
  console.log(
    `Server listens http://${process.env.DEV_SERVICE_PORT}:${process.env.DEV_SERVICE_HOST}`,
  );
});

const gracefulShutdown = (err, origin) => {
  if (err) {
    console.log(`Caught exception: ${err}`);
  }

  if (origin) {
    console.log(`Exception origin: ${origin}`);
  }

  console.log('Closing http server.');
  server.close(() => {
    console.log('Http server closed.');

    (async () => {
      await baseRepository.connection.close();
      console.log('Database connection is closed.');
    })();

    console.log('All processes are closing.');
    process.exit(0);
  });
};

process.on('uncaughtException', (err, origin) => gracefulShutdown(err, origin));

process.on('SIGTERM', () => gracefulShutdown());

process.on('SIGINT', () => gracefulShutdown());
