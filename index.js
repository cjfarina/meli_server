const express = require("express");
const cors = require("cors");
const path = require("path");

const v1ItemRouter = require("./src/v1/routes/itemsRoutes");

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

app.use(express.static(__dirname + "/public/"));
app.use("/api/v1/items", v1ItemRouter);

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});
