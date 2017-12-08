module.exports = function (app){
    var handlers = require("../controllers/index.controllers");
    app.use("/",handlers.enderecos);
    app.use("/index.html",handlers.enderecos);
};
