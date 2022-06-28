module.exports.home= function(app,req,res){

    if(req.session.autorizado != true){
        res.send('usuario precisa fazer login');
        return;
    }

    const ConfirmaDAO = new app.app.models.ConfirmaDAO(); 
    ConfirmaDAO.pegaConfirmaPorNBIEmissor(req, res)
}

module.exports.sair = function(aplication, req, res){
    req.session.destroy(function(err){
        res.render('index',{validacao: {}, dadosForm: {}, emailOuSenhaInvalida: {}, registo:{}, resultados:{}} );
    });
} 

module.exports.eliminar= function(app,req,res){

    const url_query = req.query;

    const ConfirmaDAO = new app.app.models.ConfirmaDAO(); 
    ConfirmaDAO.eliminar(req, res, url_query)
}
