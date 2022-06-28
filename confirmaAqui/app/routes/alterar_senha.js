const { check, validationResult } = require('express-validator');

module.exports = function(app){

    app.get('/alterar_senha', function(req, res){
        app.app.controllers.alterar_senha.alterarSenha(req, res)
    })

    app.post('/update_senha',[
		check('senha_actual').not().isEmpty().withMessage(' o campo senha actual é obrigatório'),
		check('nova_senha').not().isEmpty().withMessage('o campo nova senha é obrigatório'),
		check('repetir_nova_senha').not().isEmpty().withMessage('o campo repetir nova senha é obrigatório')
	],  function(req, res){

        app.app.controllers.alterar_senha.updateSenha(app, req, res, validationResult);
    })
}
