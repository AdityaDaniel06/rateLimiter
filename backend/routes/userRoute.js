const express = require("express");
const routes = express.Router();

const userData = require("../controllers/userData");

routes.get("/user-data", userData.getUserData);

module.exports = routes;
