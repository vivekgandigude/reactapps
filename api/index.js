import express from "express";
import router from "./route.js";
import cors from "cors";
import olympicsservice from "./dataacess/olympicsservice.js";
import swaggerJSDoc from "swagger-jsdoc";
import SwaggerUi  from "swagger-ui-express";

const handleError = (err, res) => {
  const { success, data } = err;
  console.log(err);

  let errorMsg = "";
  if (data === undefined && err !== undefined) errorMsg = err.message;
  else if (data.message === undefined) errorMsg = data.data;
  else errorMsg = data.message;
  res.send({ success: success, data: errorMsg });
};
const swaggerUIoptions = {
  swaggerDefinition: {
    info: {
      title: "GLPS POC API",
      description: "GLPS POC API description",
      contact: {
        name: "Gilead",
      },
    },
  },
  //['route.js']
  apis: ["index.js"],
};

const app = express();
const port = 8081;
app.use(cors());
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true, limit: "100mb" }));

app.use(router);
app.use((err, req, res, next) => {
  handleError(err, res);
});


const swaggerDocs = swaggerJSDoc(swaggerUIoptions);
app.use(
  "/api-docs",
  SwaggerUi.serve,
  SwaggerUi.setup(swaggerDocs)
);
/**
 * @swagger
 * /:
 *  get:
 *   description: Hi
 *   responses:
 *      '200':
 *        description: A successful response
*/
app.get("/", (req, res) => {
  res.send("Hello app!!");
});

/**
 * @swagger
 * /olympicWinners:
 *  get:
 *   description: Hi
 *   responses:
 *      '200':
 *        description: A successful 
*/
app.get("/olympicWinners", function (req, res) {
  olympicsservice.getData(req.body, (rows, lastRow) => {
    res.json({ rows: rows, lastRow: lastRow });
  });
});
app.listen(port, () => {
  console.log(`App running on port : ${port}.`);
});
