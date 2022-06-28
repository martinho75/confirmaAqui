module.exports = function(app){
    app.post('/pesquisaHome', function(req, res){
        app.app.controllers.resultados_pesquisas.resultadosPesquisasHome(app, req, res);
    })

    app.post('/pesquisaRecibos', function(req, res){
        app.app.controllers.resultados_pesquisas.resultadosPesquisasRecibos(app, req, res);
    })
}