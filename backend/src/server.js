import dotenv from "dotenv";
dotenv.config();
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

const swaggerDoc = YAML.load("./docs/swagger.yml");

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));


import app from "./app.js";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
