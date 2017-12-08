module.exports = function (app){
    var handlers = require("../controllers/cliente.controllers");
    app.use("/listarClientes.html", handlers.listar);
    app.use("/novoCliente.html",handlers.criaCliente);
    app.use("/excluirCliente.html", handlers.excluir);
    app.use("/login.html", handlers.login);
};
