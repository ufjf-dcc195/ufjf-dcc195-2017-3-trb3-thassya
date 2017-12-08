// var listaNomes;

// module.exports = function (nome) {
//     listaNomes =+ nome;
//     return listaNomes;
// };

var sorteados = [];
var valorMaximo = 16;

module.exports = function() {
    if (sorteados.length == valorMaximo) {
        if (confirm('Já não há mais! Quer recomeçar?')) 
        sorteados = [];
        else 
        return;
    }
    
    var sugestao = Math.ceil(Math.random() * valorMaximo); // Escolher um numero ao acaso   
    console.log(sugestao);

    while (sorteados.indexOf(sugestao) >= 0) {  // Enquanto o numero já existir, escolher outro
        sugestao = Math.ceil(Math.random() * valorMaximo);
    }
    sorteados.push(sugestao); // adicionar este numero à array de numeros sorteados para futura referência
    return sugestao; // devolver o numero único
}