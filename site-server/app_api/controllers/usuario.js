var User = require('../models/usuario');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
module.exports.cadastra = function(req, res){
    var salt = crypto.randomBytes(16). toString('hex');
    var hash = crypto.pbkdf2Sync(req. body.pwd, salt, 1000, 64, 'sha512').toString('hex');
    var id = {
        "nome": req.body.nome,
        "hash": hash,
        "salt": salt
    };
    User.create(id).then(
        function(user){
            res.json("Cadastrado com sucesso");
        },
        function(erro){
            if(erro.code == "11000"){
                res.json("Usuário já cadastrado");
            }else{
                res.status(500).json(erro);
            }
        }
    );
};
module.exports.logar = function(req, res){
    var erro = {
        'UNE': 1,
        'SI': 2
    }
    var elementos = {
        nome: req.body.nome,
        senha: req.body.pwd,
        token: ""
    }
    User.findOne({'nome': elementos.nome}).exec().then(
        function(user){
            if(!user){
                res.json(erro.UNE);
            }else{
                var senhaValida = validPwd();
                function validPwd(){
                    var hash = crypto.pbkdf2Sync(elementos.senha, user.salt, 1000, 64, 'sha512').toString('hex');
                    return user.hash === hash;
                }
                if(senhaValida == true){
                    elementos.token = geraJwt();
                    function geraJwt(){
                        var expira = new Date();
                        expira.setDate(expira.getDate()+1);
                        return jwt.sign({
                            "validade": parseInt(expira.getTime()/1000)
                        }, "segredo");
                    }
                    var expira = new Date();
                    expira.setDate(expira.getDate()+1);
                    var dados = {
                        token: elementos.token,
                        nome: elementos.nome,
                        validade: parseInt(expira.getTime()/1000)
                    }
                    res.json(dados);
                }else{
                    res.json(erro.SI);
                }
            }
        },
        function(erro){
            res.json(erro);
        }
    );
}
