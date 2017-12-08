var express = require("express");
var morgan = require("morgan");
var methodOverride = require("method-override");
var compression = require("compression");
var bodyParser = require("body-parser");
var session = require('express-session');
var expressLayouts = require('express-ejs-layouts')
var ejs = require("ejs");

process.env.NODE_ENV = process.env.NODE_ENV || 'devel';


var config = require('./config');

module.exports = function(){
    var app = express();
    if(process.env.NODE_ENV === 'devel'){
      app.use(morgan('dev'));
      console.log(process.env.NODE_ENV);
    } else if(process.env.NODE_ENV === 'production'){
      app.use(compression());
    }
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(bodyParser.json());
    app.use(methodOverride());
    app.use(session({
      saveUninitialized: true,
      resave: true,
      secret: config.secret
    }));
    app.use(expressLayouts);
    app.set('views', './app/views');
    app.set('view engine', 'ejs');


    app.use(express.static('./public'));
    require("../app/routes/cliente.routes")(app);
    require("../app/routes/produto.routes")(app);
    require("../app/routes/sobre.routes")(app);
    require("../app/routes/index.routes")(app);

    return app;
  };
