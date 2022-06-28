const config = require('../../config/config');
const MongoClient = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
const assert = require('assert') ;
const crypto = require('crypto');

function UsuarioDAO(){
   
}

UsuarioDAO.prototype.cadastrar = function(usuario,res){

  MongoClient.connect(config.db_string,{ useUnifiedTopology: true, useNewUrlParser: true}, function(err, db) {
    if(err) throw err;
    const dbo = db.db(config.db_name);

  /*criptografa a senha do usuário*/
   const passwordCrypto = crypto.createHash('md5').update(usuario.senha).digest('hex');
   usuario.senha = passwordCrypto;
   console.log(usuario);
 
  MongoClient.connect(config.db_string,{ useUnifiedTopology: true, useNewUrlParser: true}, function(err, db) {
    const dbo = db.db(config.db_name)

    dbo.collection("usuario").find({$or:[{email : (usuario.email)},{numero_BI: usuario.numero_BI}]}).toArray(function(err,result){
      if(err) throw err;
      console.log("usuarios");
     console.log(result);

      
      if(result[0] === undefined){
        dbo.collection('usuario').insertOne(usuario,function(err, result){
       
          if(err) throw err;

          res.render('index',{registo:'usuario cadastrado com sucesso, podes te logar a qualquer momento', resultados:{} , validacao:{}, dadosForm:{}, emailOuSenhaInvalida:{}});
        })
      }else{
        res.render('index',{registo: 'estes usuários já estao sendo usados:', validacao:{}, dadosForm:{}, resultados: result, emailOuSenhaInvalida:{}});
      }
    });
});
  db.close();
  db.close();
});
}

UsuarioDAO.prototype.autenticar = function(usuario, req, res){

  MongoClient.connect(config.db_string,{ useUnifiedTopology: true, useNewUrlParser: true}, function(err, db) {
      if(err) throw err;
      const dbo = db.db(config.db_name);

      const senhaCrypto = crypto.createHash('md5').update(usuario.senha).digest('hex');
      usuario.senha = senhaCrypto;

       dbo.collection("usuario").find(usuario).toArray(function(err, docs) {
          if(err) throw err;
          if(docs[0] != undefined){
              req.session.autorizado = true;
              req.session.usuario = docs[0];
              req.session.id = docs[0]._id;
          }
          if(req.session.autorizado){
              res.redirect("home");
          }else{
              
              res.render("index",{emailOuSenhaInvalida:'email ou senha inválida', resultados:{}, validacao:{}, dadosForm:usuario, registo:{} });
          }
          db.close();
        });
    });
} 

UsuarioDAO.prototype.atualizarPerfil = function(req, res, usuario){
  console.log("usuario dados")
  console.log(usuario)
  MongoClient.connect(config.db_string,{ useUnifiedTopology: true, useNewUrlParser: true}, function(err, db) {
    if(err) throw err;
    const dbo = db.db(config.db_name);

  MongoClient.connect(config.db_string,{ useUnifiedTopology: true, useNewUrlParser: true}, function(err, db) {
    const dbo = db.db(config.db_name)

    dbo.collection("usuario").find({numero_BI: usuario.numero_BI}).toArray(function(err,result){
      if(err) throw err;
      
      if(((result[0]._id == req.session.usuario._id)) || (result[0] === undefined) ){

        var myquery = { _id: objectId(req.session.usuario._id)};
        var newvalues = { $set: usuario };

        dbo.collection('usuario').updateOne( myquery,newvalues,function(err, result){
          console.log(result)
          if(err) throw err;

          res.render('editarPerfil',{registo:'actualização feita com sucesso', resultados:{} , usuario:usuario, validacao:{}});
        })
      }else{
        res.render('editarPerfil',{registo: 'este usuário já está em uso dados não foram alterados:', validacao:{},usuario:usuario, resultados: result});
      }
    });
});
  db.close();
  db.close();
});

}


UsuarioDAO.prototype.editarPerfil = function(req, res){

  MongoClient.connect(config.db_string,{ useUnifiedTopology: true, useNewUrlParser: true}, function(err, db) {
    if(err) throw err;
    const dbo = db.db(config.db_name);


    dbo.collection("usuario").find({_id: objectId(req.session.usuario._id)}).toArray(function(err, result) {
      if (err) throw err;
      res.render('editarPerfil',{usuario: result[0], validacao:{}, resultados:{}, registo:{}});
      db.close();
    });
});
}

UsuarioDAO.prototype.updateSenha = function(req, res, dadosForm){

  if(dadosForm.nova_senha == dadosForm.repetir_nova_senha){

    const senhaCrypto = crypto.createHash('md5').update(dadosForm.nova_senha).digest('hex');
    dadosForm.senha_actual = senhaCrypto;

    MongoClient.connect(config.db_string,{ useUnifiedTopology: true, useNewUrlParser: true}, function(err, db) {
      if(err) throw err;
      const dbo = db.db(config.db_name);
  
  
       var myquery = { _id: objectId(req.session.usuario._id)};
        var newvalues = { $set: {senha: dadosForm.senha_actual} };

        dbo.collection('usuario').updateOne( myquery,newvalues,function(err, result){
          
          if(err) throw err;

          res.render('alterar_senha',{registo:'actualização feita com sucesso', validacao:{}});
        })
  });
  }else{
    res.render('alterar_senha',{registo:' os dados  dos campos nova senha e repetir nova senha não são compatíveis', validacao:{}});
  }

}

module.exports = function(){
    return UsuarioDAO;
}

