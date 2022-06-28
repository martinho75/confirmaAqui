module.exports.editarPerfil = function(app, req, res){

    if(req.session.autorizado != true){
        res.send('usuario precisa fazer login');
        return;
    }

    const UsuarioDAO = new app.app.models.UsuarioDAO();

    UsuarioDAO.editarPerfil(req, res);
}

module.exports.atualizarPerfil = function(app, req, res, validationResult){
    const dadosForm = req.body;
    errors = validationResult(req);

    if(!errors.isEmpty()){
        res.render('editarPerfil', {validacao: errors.array(), resultados:{}, registo:{}, usuario:req.session.usuario});
        return;
    }

    const UsuarioDAO = new app.app.models.UsuarioDAO();

    UsuarioDAO.atualizarPerfil(req, res, dadosForm);
}