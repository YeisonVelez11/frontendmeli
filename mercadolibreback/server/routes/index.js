const express = require("express");
const app = express();
app.use(require("./mercadolibre"));
module.exports = app;
