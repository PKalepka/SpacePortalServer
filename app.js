const express = require("express");
const config = require("config");
const app = express();
const serviceConfig = config.get("Service");
const feedApi = require("./api/neoFeed");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app
  //returns either online NASA API content or database cached result if it already exists
  .route("/neo/feed")
  .get((req, res) => {
    const startDate = req.query.start_date;
    const endDate = req.query.end_date;

    return feedApi.neoFeed(startDate, endDate, (content) =>
      res
        .setHeader("Access-Control-Allow-Origin", "*")
        .status(200)
        .send(JSON.stringify(content))
    );
  });

app.listen(serviceConfig.port, serviceConfig.host, () =>
  console.log(
    `Server listens http://${serviceConfig.host}:${serviceConfig.port}`
  )
);
