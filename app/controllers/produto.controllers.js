var Produto = require('mongoose').model('Produto');

module.exports.criaProduto = function(req, res, next) {
    if(req.method=='GET'){
      res.render('produto/novo',{'clienteLogado':req.session.clienteLogado});
    }
    else {
      var user = new Produto(req.body);
      user.save(function(err){
      if(err){ return next(err); }
      else {
        calculaPrecos();
        res.redirect("/listarProdutos.html");
        //res.json(user);
      }
   });

    }
};

module.exports.listar = function(req,res,next){

  Produto.find({}).then(
  function(produtos){
    // console.log(produtos);
    res.render('produto/listar',{'produtos': produtos, 'clienteLogado':req.session.clienteLogado} );
  },
  function(err){
    return next(err);
  });

};

module.exports.buscar = function (req,res,next) {
  console.log(req.body.termo);

  switch (req.body.opcao) {
    case "Nome": {
      Produto.find(
      {'nome': req.body.termo},
      	function(err, users){
      		if(err){ return next(err); }
      	 	else { res.render('produto/listar',{'produtos': users, 'clienteLogado':req.session.clienteLogado} );   }
         }
        );
       break;
    }
    case "Preco Base": {
      Produto.find(
      {'preco_base': req.body.termo},
        function(err, users){
          if(err){ return next(err); }
          else { res.render('produto/listar',{'produtos': users, 'clienteLogado':req.session.clienteLogado} );   }
         }
        );
       break;
    }
    case "Soma Interesses":{
      Produto.find(
      {'soma_interesses': req.body.termo},
      	function(err, users){
      		if(err){ return next(err); }
      	 	else { res.render('produto/listar',{'produtos': users, 'clienteLogado':req.session.clienteLogado} );   }
         }
        );
       break;
    }
    case "Preco": {
      Produto.find(
      {'preco': req.body.termo},
        function(err, users){
          if(err){ return next(err); }
          else { res.render('produto/listar',{'produtos': users, 'clienteLogado':req.session.clienteLogado} );   }
         }
        );
       break;
    }
    default:{
    console.log("Não retornou resultados");
    res.redirect("/listarProdutos.html");
  }
  }
};

module.exports.editar = function(req,res,next){
  console.log("método editar!!");

    Produto.findOne(
    {"_id": req.query.id}).then(
      function (err, produto){
        if(err){
          return next(err);
        }
        else {
          console.log(produto);
          res.render('produto/editar', {'produto': produto, 'clienteLogado':req.session.clienteLogado} );
        }
      }
    );
};

module.exports.excluir = function(req,res,next){
    Produto.findByIdAndRemove(
		{"_id": req.query.id}, function(err, users){
			if(err){
				return next(err);
			}
	 		else {
        console.log(users);
	 			res.redirect("/listarProdutos.html");
	 	    }
   	});
};

//0/inexistente - sem interesse, 1 - baixo interesse, 2 - tenho interesse e 3 - muito interessado.
module.exports.adicionarInteresse = function(req,res,next){
  console.log("query id: " + req.query.id);

    if(req.method=='GET'){
      Produto.findOne(
      {"_id": req.query.id}).then(
        function (produto){
          req.session.produto=produto;
          res.render('produto/interesse', {'produto': produto,'clienteLogado':req.session.clienteLogado});
        }
        ,function(err){
            console.log("OPSS");
            return next(err);
        });
      }
    else {
      var interesse = req.body.interesse;
      var p = req.session.produto;

      console.log("Interesse: "+ interesse);
      var valor=0;

      switch (interesse) {
        case 'Baixo interesse':{
            console.log("baixo");
          valor = 1;     break;
        }
        case 'Tenho interesse': {
            console.log("tenho");
            valor=2;       break;
        }
        case 'Muito interessado': {
            console.log("muito");
          valor=3;   break;
        }
        case 'Sem interesse': {
            console.log("NO NO NO");
          valor=0;  break;
        }
        default: {valor=0;}
      }


      var avaliado =false;
      var nota="";
      for(var i in p.interesses){
          var aux = p.interesses[i];
          if(req.session.clienteLogado._id==aux.id_cliente){
            avaliado = true;
            nota= aux.valor;
            break;
          }
      }
      if(!avaliado){
        p.soma_interesses =  p.soma_interesses+valor;
        p.interesses[p.numero_interessados]={id_cliente:req.session.clienteLogado._id,cliente:req.session.clienteLogado.nome,'valor':interesse}
        p.numero_interessados=p.numero_interessados+1;
        Produto.findByIdAndUpdate(
          p._id,
          p,
          {new: true}
        ).then(
          function (produto){
            calculaPrecos();
            res.redirect("/listarProdutos.html")
          },
          function(err) {
            return next(err);
          }
        );
      }
      else res.redirect("/listarProdutos.html");
      }
};

function calculaPrecos(){
  Produto.find({}).then(
   function(produtos){
     var maior_interesse=produtos[0];
     for(var i in produtos){
       var p = produtos[i]
       if(p.soma_interesses>maior_interesse.soma_interesses){
         maior_interesse=p;
       }
     }
     if(maior_interesse.soma_interesses>0){
       for(var i in produtos){
         var p = produtos[i]
         if(p.soma_interesses>0){
           p.preco=p.preco_base+p.preco_base*(p.soma_interesses/maior_interesse.soma_interesses);
           salvaProduto(p)
         }else if(p.soma_interesses==0&&p.preco==0){
               p.preco=p.preco_base;
               salvaProduto(p)
         }
       }
     }else{
       for(var i in produtos){
         var p = produtos[i]
         if(p.preco==0){
           p.preco=p.preco_base
           salvaProduto(p)
         }
       }
     }
   },
   function(err){
     return next(err);
   });
}
