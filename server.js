const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");
require("./database/database");

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

module.exports = server;
