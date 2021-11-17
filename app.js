const dotenv = require('dotenv').config({
  path: './config/.env',
  debug: process.env.DEBUG,
});
const express = require('express');
const cors = require('cors');
const app = express();
const FeedApi = require('./api/feedApi');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app
  //returns either online NASA API content or database cached result if it already exists
  .route('/neo/feed')
  .get((req, res) => {
    (async () => {
      const startDate = req.query.start_date;
      const endDate = req.query.end_date;

      var content = await new FeedApi().neoFeed(startDate, endDate);
      res.status(200).send(JSON.stringify(content));
      return content;
    })();
  });

app.listen(process.env.DEV_SERVICE_PORT, process.env.DEV_SERVICE_HOST, () => {
  if (dotenv.error) {
    console.log(`dotenv error: ${dotenv.error}`);
  }
  console.log(
    `Server listens http://${process.env.DEV_SERVICE_PORT}:${process.env.DEV_SERVICE_HOST}`,
  );
});
