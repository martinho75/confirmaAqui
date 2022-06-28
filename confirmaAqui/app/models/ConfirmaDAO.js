const config = require('../../config/config');
const MongoClient = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
const assert = require('assert') ;

function ConfirmaDAO(){
   
}

ConfirmaDAO.prototype.confirma = function(dadosForm, req, res){

  MongoClient.connect(config.db_string,{ useUnifiedTopology: true, useNewUrlParser: true}, function(err, db) {
    if(err) throw err;
    const dbo = db.db(config.db_name);
    const data = new Date();
    dadosForm.dia = data.getDate();
    dadosForm.mes = data.getMonth() + 1;
    dadosForm.ano= data.getUTCFullYear();
    dadosForm.hora= data.getUTCHours();
    dadosForm.minutos= data.getMinutes();

    dbo.collection("confirma").insertOne(dadosForm, function(err, result) {
      if (err) throw err;
      res.render('criar',{msg: 'Documento inserido com sucesso', dadosForm:{}, validacao:{}, usuario_session: req.session.usuario});
  
      db.close();
    });
});
}

ConfirmaDAO.prototype.pegaConfirmaPorNBIEmissor = function(req, res){

  MongoClient.connect(config.db_string,{ useUnifiedTopology: true, useNewUrlParser: true}, function(err, db) {
    if(err) throw err;
    const dbo = db.db(config.db_name);


    dbo.collection("confirma").find({numero_BI: req.session.usuario.numero_BI}).toArray(function(err, result) {
      if (err) throw err;
      res.render('home',{ confirma: result, documentoElimiado:{}});
      db.close();
    });
});
}


ConfirmaDAO.prototype.pegaConfirmaPorNBIReceptor = function(req, res){

  MongoClient.connect(config.db_string,{ useUnifiedTopology: true, useNewUrlParser: true}, function(err, db) {
    if(err) throw err;
    const dbo = db.db(config.db_name);


    dbo.collection("confirma").find({numero_BI_Receptor: req.session.usuario.numero_BI}).toArray(function(err, result) {
      if (err) throw err;
      res.render('recibo',{ confirma: result, msgAceite:{}});
      db.close();
    });
});
}

ConfirmaDAO.prototype.aceitarConfirmacao= function(req, res, url_query){
  MongoClient.connect(config.db_string,{ useUnifiedTopology: true, useNewUrlParser: true}, function(err, db) {
    if (err) throw err;
    const d = new Date();
    const dbo = db.db(config.db_name);
    var myquery = { _id: objectId(url_query.id)};
    var newvalues = { $set: {estado: "Aceite", dia_aceite: d.getDate(), mes_aceite: d.getMonth(),
    ano_aceite: d.getUTCFullYear(), hora_aceite: d.getUTCHours(), minutos_aceite: d.getMinutes()
  } };
    dbo.collection("confirma").updateOne(myquery, newvalues, function(err, result) {
      if (err) throw err;
      res.render('recibo',{msgAceite: 'confirmação aceite com sucesso', confirma:{}})
      db.close();
    });
  }); 
}

ConfirmaDAO.prototype.eliminar= function(req, res, url_query){
  MongoClient.connect(config.db_string,{ useUnifiedTopology: true, useNewUrlParser: true}, function(err, db) {
    if (err) throw err;
    const d = new Date();
    const dbo = db.db(config.db_name);
    var myquery = { _id: objectId(url_query.id)};
    dbo.collection("confirma").deleteOne(myquery, function(err, result) {
      if (err) throw err;
      res.render('home',{documentoElimiado: 'documento eliminado com sucesso', confirma:{}})
      db.close();
    });
  }); 
}

ConfirmaDAO.prototype.resultadosPesquisasHome =  function(req, res, pesquisa){
  MongoClient.connect(config.db_string,{ useUnifiedTopology: true, useNewUrlParser: true}, function(err, db) {
    if(err) throw err;
    const dbo = db.db(config.db_name);


    dbo.collection("confirma").find({numero_BI: req.session.usuario.numero_BI, numero_BI_Receptor: pesquisa.pesquisaPorBI}).toArray(function(err, result) {
      if (err) throw err;
      res.render('resultados_pesquisas',{ confirma: result, home: true, recibos:{}});
      db.close();
    });
});
}

ConfirmaDAO.prototype.resultadosPesquisasRecibos =  function(req, res, pesquisa){
  MongoClient.connect(config.db_string,{ useUnifiedTopology: true, useNewUrlParser: true}, function(err, db) {
    if(err) throw err;
    const dbo = db.db(config.db_name);
    

    dbo.collection("confirma").find({numero_BI: req.session.usuario.numero_BI, numero_BI: pesquisa.pesquisaBI}).toArray(function(err, result) {
      if (err) throw err;
      
      res.render('resultados_pesquisas',{ confirma: result, recibos: true, home:{}});
      db.close();
    });
});
}


module.exports = function(){
    return ConfirmaDAO;
}

