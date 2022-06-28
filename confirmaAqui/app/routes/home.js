module.exports =  function(app){

    app.get('/home', function(req, res){
        app.app.controllers.home.home(app, req, res);
    })

    app.get('/sair', function(req, res){
        app.app.controllers.home.sair(app, req, res);
    })

    app.get('/eliminar', function(req, res){
        app.app.controllers.home.eliminar(app, req, res);
    })
}