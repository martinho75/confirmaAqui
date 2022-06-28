module.exports =  function(app){
    app.get('/recibo', function(req, res){
        app.app.controllers.recibo.recibo(app, req, res);
    })
    
    app.get('/aceitar', function(req, res){
        app.app.controllers.recibo.aceitar(app, req, res);
    }) 
}