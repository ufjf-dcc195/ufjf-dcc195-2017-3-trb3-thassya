var mongoose = require('mongoose')
var Schema = mongoose.Schema

var ProdutoSchema = new Schema({
  nome: String,
  preco_base: Number,
  preco: Number,
  interesses: Array,
  soma_interesses: Number,
  numero_interessados :Number,
})
mongoose.model('Produto',ProdutoSchema)
