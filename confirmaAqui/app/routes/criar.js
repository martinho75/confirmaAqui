const { check, validationResult } = require('express-validator');

module.exports =  function(app){

    app.get('/criar', function(req, res){
        app.app.controllers.criar.criar(app, req, res);
    })

    app.post('/confirmar',[
        check('gerado_por').not().isEmpty().withMessage('prieencha o campo Gerado Por'),
		check('numero_BI').not().isEmpty().withMessage('Numero do BI é obrigatório'),
		check('assunto').not().isEmpty().withMessage('Assunto não pode estar vazio'),
        check('recebido_por').not().isEmpty().withMessage('prieencha o campo Recebido Por'),
		check('numero_BI_Receptor').not().isEmpty().withMessage('numero do BI Receptor não pode estar vazio')
    ], function(req, res){
        app.app.controllers.criar.confirma(app, req, res, validationResult);
    })

}