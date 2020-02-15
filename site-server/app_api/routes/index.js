var express = require('express');
var router = express.Router();

var VideoCtrl = require('../controllers/video');
var UsuarioCtrl = require('../controllers/usuario');
/* GET home page. */
//Listar vídeos cadastrados
router.get('/listar/:id', VideoCtrl.listar);
//Adicionar novos vídeos
router.post('/add', VideoCtrl.add);
//Exclui registro com ID
router.delete('/remove/:id', VideoCtrl.remove);
//Buscar informação vídeo
router.get('/busca/:id', VideoCtrl.busca);
//Atualizar vídeo
router.put('/atualiza/:id', VideoCtrl.atualiza);
//Lista vídeos pagina inicial
router.get('/listaInicio', VideoCtrl.listaInicio);
//Pesquisar documento no banco
router.get('/pesquisa/:id', VideoCtrl.pesquisa);

//Controle Usuário
router.post('/cadastra', UsuarioCtrl.cadastra);
router.post('/logar', UsuarioCtrl.logar);
module.exports = router;
