const { check, validationResult } = require('express-validator');

module.exports=function(app){
    app.get('/', function(req,res){
        app.app.controllers.index.index(app,req,res)
    })

    app.post('/cadastrar',[
		check('nome_completo').not().isEmpty().withMessage('prieencha o campo Nome Completo'),
		check('email').isEmail().withMessage('Não é um email'),
		check('senha').not().isEmpty().withMessage('senha não pode estar vazio'),
		check('numero_BI').not().isEmpty().withMessage('numero do BI não pode estar vazio')
	], function(req, res){
        app.app.controllers.index.cadastrar(app, req, res, validationResult)
    })

    app.post('/autenticar', function(req, res){
        app.app.controllers.index.autenticar(app,req, res);
    })
    
} 