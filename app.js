const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const employeeRoutes = require("./api/routes/employees");
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://node-shop:" +
    process.env.MONGO_ATLAS_PW +
    "@node-rest-shop-shard-00-00-eimmr.mongodb.net:27017," +
    "node-rest-shop-shard-00-01-eimmr.mongodb.net:27017," +
    "node-rest-shop-shard-00-02-eimmr.mongodb.net:27017/test?ssl=true&replicaSet=node-rest-shop-shard-0&authSource=admin&retryWrites=true",
  {
    useMongoClient: true
  }
);
mongoose.Promise = global.Promise;

app.use(bodyParser.json());
app.use("/employees", employeeRoutes);
module.exports = app;

// const express = require("express");
// const bodyparser = require("body-parser");
// const app = express();

// const employeeRoutes = require("./api/routes/employee");

// app.use(bodyparser.json());

// app.use("/employees", employeeRoutes);

// module.exports = app;
