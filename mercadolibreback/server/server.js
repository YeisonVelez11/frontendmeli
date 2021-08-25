require("./config/config");

const express = require("express");
const path = require("path");
const app = express();
var cors = require("cors");
const fs = require("fs");
const bodyParser = require("body-parser");
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Documentation Test Front-End Mercado Libre',
    version: '1.0.0',
    description:
      'Test - Yeison Velez'
  },
  supportedSubmitMethods: []
};

const options = {
  swaggerDefinition,
  // Path to the API docs
  apis: [`${__dirname}/routes/mercadolibre.js`],
}
const swaggerSpec = swaggerJSDoc(options);

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-COntrol-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});
app.use(cors());
app.options("*", cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// Configuración global de rutas
app.use(require("./routes/index"));
const distDirectory = path.join(__dirname, "/public");
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: false, customCss: "button { display:none;} input{display:none}" }));

app.get("*", function (req, res, next) {
  const file_path = path.join(distDirectory, req.url.split("?").shift());
  if (fs.existsSync(file_path)) next();
  else res.sendFile(path.join(distDirectory, "index.html"));
});
app.use(express.static(distDirectory));

app.listen(process.env.PORT, () => {
  console.log("Escuchando puerto: ", process.env.PORT);
});
