module.exports.criar= function(app,req,res){

    if(req.session.autorizado != true){
        res.send('usuario precisa fazer login');
        return;
    }
    
    res.render('criar',{validacao:{}, dadosForm:{},msg:{}, usuario_session: req.session.usuario});
}

module.exports.confirma= function(app, req, res, validationResult){

    const dadosForm = req.body;
    errors = validationResult(req);

    if(!errors.isEmpty()){
        res.render('criar', {validacao: errors.array(), dadosForm: dadosForm, msg:{}, usuario_session: req.session.usuario});
        return;
    }

    const ConfirmaDAO = new app.app.models.ConfirmaDAO(); 
    ConfirmaDAO.confirma(dadosForm, req, res)
}

