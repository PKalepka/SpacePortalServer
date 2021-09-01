const dotenv = require('dotenv').config({
  path: './config/.env',
  debug: process.env.DEBUG,
});
const express = require('express');
const app = express();
const feedApi = require('./api/neoFeed');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app
  //returns either online NASA API content or database cached result if it already exists
  .route('/neo/feed')
  .get((req, res) => {
    const startDate = req.query.start_date;
    const endDate = req.query.end_date;

    return feedApi.neoFeed(startDate, endDate, (content) =>
      res.setHeader('Access-Control-Allow-Origin', '*').status(200).send(JSON.stringify(content)),
    );
  });

app.listen(process.env.DEV_SERVICE_PORT, process.env.DEV_SERVICE_HOST, () => {
  if (dotenv.error) {
    console.log(`dotenv error: ${dotenv.error}`);
  }
  console.log(
    `Server listens http://${process.env.DEV_SERVICE_PORT}:${process.env.DEV_SERVICE_HOST}`,
  );
});
