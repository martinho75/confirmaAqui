const crypto = require('crypto');

module.exports.alterarSenha = function( req, res){
    res.render('alterar_senha', { validacao:{}, registo:{}})
}

module.exports.updateSenha = function( app, req, res, validationResult){

    const dadosForm = req.body;
    errors = validationResult(req);

    if(!errors.isEmpty()){
        res.render('alterar_senha', {validacao: errors.array(), registo: {}});
        return;
    }

    const passwordCrypto = crypto.createHash('md5').update(dadosForm.senha_actual).digest('hex');

    if( passwordCrypto == req.session.usuario.senha){

        const UsuarioDAO = new app.app.models.UsuarioDAO();
    
        UsuarioDAO.updateSenha(req, res, dadosForm)
    }else{
        res.render('alterar_senha', {registo:'senha actual errada', validacao:{}})
    }
}