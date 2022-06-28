const { check, validationResult } = require('express-validator');

module.exports = function(app){
    app.get('/editarPerfil', function(req, res){
        app.app.controllers.editarPerfil.editarPerfil(app, req, res);
    })

    app.post('/atualizarPerfil',[
		check('nome_completo').not().isEmpty().withMessage('prieencha o campo Nome Completo'),
		check('numero_BI').not().isEmpty().withMessage('numero do BI não pode estar vazio')
	], function(req, res){

        app.app.controllers.editarPerfil.atualizarPerfil(app, req, res, validationResult);
    })
}