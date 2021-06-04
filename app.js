const express = require('express'),
  config = require('config'),
  app = express(),
  serviceConfig = config.get('Service'),
  feedApi = require('./api/neoFeed');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app
  .route('/neo/feed')
  .get((req, res) => {
    const startDate = req.query.start_date;
    const endDate = req.query.end_date;

    return feedApi.neoFeed(startDate, endDate, content => res.status(200).send(JSON.stringify(content)));
  });

app.listen(serviceConfig.port, serviceConfig.host, () =>
  console.log(`Server listens http://${serviceConfig.host}:${serviceConfig.port}`)
);