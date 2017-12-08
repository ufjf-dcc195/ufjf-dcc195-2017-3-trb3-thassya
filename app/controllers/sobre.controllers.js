module.exports.sobre = function (req, res, next){
    res.render('sobre/sobre',
        {nome: "Thassya de Souza Abreu",
        curso: "Sistemas de Informação",
        matricula: "200876005",
        email: "thayowisky@gmail.com",
        'clienteLogado':req.session.clienteLogado});
  };
