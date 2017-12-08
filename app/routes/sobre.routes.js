module.exports = function (app) {
    var handlers = require("../controllers/sobre.controllers");
    app.use("/sobre.html", handlers.sobre);
  };
  
  