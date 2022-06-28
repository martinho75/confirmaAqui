const { body } = require("express-validator");

module.exports.index = function(app, req, res){
    res.render('index', {validacao:{}, dadosForm:{}, registo:{}, resultados:{}, emailOuSenhaInvalida:{}})
}

module.exports.cadastrar = function(app, req, res, validationResult){

    const dadosForm = req.body;
    errors = validationResult(req);

    if(!errors.isEmpty()){
        res.render('index', {validacao: errors.array(), resultados:{}, dadosForm: dadosForm, registo:{}, emailOuSenhaInvalida:{}});
        return;
    }

    const UsuariosDAO = new app.app.models.UsuarioDAO(); 

    UsuariosDAO.cadastrar(dadosForm, res)
}

module.exports.autenticar = function(app, req, res){

    const dadosForm = req.body;

    const UsuarioDAO = new app.app.models.UsuarioDAO();

    UsuarioDAO.autenticar(dadosForm, req, res)
}