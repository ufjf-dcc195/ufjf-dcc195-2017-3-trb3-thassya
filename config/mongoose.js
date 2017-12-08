require('../app/models/produto.models');
require('../app/models/cliente.models');

var config = require('./config');
var mongoose = require('mongoose');
module.exports = function() {
  //mongoose.connect(config.db, {useMongoClient: true});
  //mongoose.Promise = global.Promise;
   var db = mongoose.connect(config.db);


   return db;
}
