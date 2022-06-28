module.exports.resultadosPesquisasHome = function(app, req, res){

    if(req.session.autorizado != true){
        res.send('usuario precisa fazer login');
        return;
    }

    const dadosForm = req.body;

    const ConfirmaDAO = new app.app.models.ConfirmaDAO(); 
    ConfirmaDAO.resultadosPesquisasHome(req, res, dadosForm);
}

module.exports.resultadosPesquisasRecibos = function(app, req, res){

    if(req.session.autorizado != true){
        res.send('usuario precisa fazer login');
        return;
    }

    const dadosForm = req.body;

    const ConfirmaDAO = new app.app.models.ConfirmaDAO(); 

    ConfirmaDAO.resultadosPesquisasRecibos(req, res, dadosForm);
}