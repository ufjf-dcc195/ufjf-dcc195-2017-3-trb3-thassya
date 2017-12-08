var Cliente = require('mongoose').model('Cliente');

module.exports.listar = function(req,res,next){
  Cliente.find({}).then(
   function(clientes){
     res.render('cliente/listar',{'clientes': clientes,'clienteLogado':req.session.clienteLogado});
   },
   function(err){
     return next(err);
   });
};


module.exports.criaCliente = function(req, res, next) {
    if(req.method=='GET'){
      res.render('cliente/novo');
    }
    else {
      var user = new Cliente(req.body);
      user.save(function(err){
      if(err){ return next(err); }
      else {
        res.redirect("/listarClientes.html");
      }
   });

    }
};

module.exports.login = function(req,res,next){
  if(req.query.id){
    Cliente.findOne(
    {"_id": req.query.id}).then(
      function(cliente) {
        console.log(cliente);
        req.session.clienteLogado=cliente;
        res.redirect('/listarProdutos.html');
      },
      function (err){
        next(err);
      }
    );
  }else{
    res.redirect('/index.html');
  }
}

module.exports.excluir = function(req,res,next){
    Cliente.findByIdAndRemove(
		{"_id": req.query.id}, function(err, users){
			if(err){
				return next(err);
			}
	 		else {
        console.log(users);
	 			res.redirect("/listarClientes.html");
	 	    }
   	});
};
