module.exports = function (app){
    var handlers = require("../controllers/produto.controllers");
    // app.route('/produtos').post(handlers.criaProduto).get(handlers.listar);
    app.use("/novoProduto.html",handlers.criaProduto);
    app.use("/listarProdutos.html",handlers.listar);
    app.use("/excluir.html", handlers.excluir);
    app.use("/editar.html/id=?", handlers.editar);
    app.post("/buscar.html", handlers.buscar);
    app.use("/adicionarInteresse.html",handlers.adicionarInteresse);
};
