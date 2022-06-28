module.exports.recibo= function(app,req,res){

    if(req.session.autorizado != true){
        res.send('usuario precisa fazer login');
        return;
    }
    
    const ConfirmaDAO = new app.app.models.ConfirmaDAO(); 
    ConfirmaDAO.pegaConfirmaPorNBIReceptor(req, res)
}

module.exports.aceitar= function(app,req,res){

    const url_query = req.query;

    const ConfirmaDAO = new app.app.models.ConfirmaDAO(); 
    ConfirmaDAO.aceitarConfirmacao(req, res, url_query)
}




