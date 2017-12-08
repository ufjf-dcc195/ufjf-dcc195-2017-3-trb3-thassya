var express = require("./config/express");
var mongoose = require("./config/mongoose");

var app = express();
var db = mongoose();
var porta = process.env.PORT || 3001;

app.listen(porta);
console.log("Escutando em http://localhost:"+porta);

module.exports = app;
