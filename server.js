require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());

app.use("/api/user", require("./api/user/user.router"));

app.listen(process.env.APP_PORT, () => {
  console.log("Server up and running on PORT: ", process.env.APP_PORT);
});
