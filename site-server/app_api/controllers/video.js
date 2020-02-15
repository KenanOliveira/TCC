var Video = require('../models/video');
module.exports.listar = function(req, res){
    var pular = JSON.parse(req.params.id);
    var qtdVideos = 0;
    Video.find().countDocuments().exec().then(
        function(video){
            contaVideos(video);
        }
    );
    function contaVideos(evento){
        qtdVideos = evento+" vídeos cadastrados";
    }
    Video.find().sort({"dataPublicacao":"-1"}).limit(10).skip(pular.pagina*10).exec().then(
        function(video){
            res.json({video: video, qtdVideos: qtdVideos});
        },
        function(erro){
            res.status(500).json(erro);
        }
    );
};
module.exports.add = function(req, res){
    Video.create(req.body).then(
        function(videos){
            res.json(videos);
        },
        function(erro){
            res.status(500).json(erro);
        }
    );
};
module.exports.remove = function(req, res){
    var id = req.params.id;
    Video.remove({"_id": id}).exec().then(
        function(videos){
            res.json(videos);
        },
        function(erro){
            res.status(500).json(erro);
        }
    );
};
module.exports.busca = function(req, res){
    var id = req.params.id;
    Video.findById({"_id": id}).exec().then(
        function(video){
            if(!video){
                res.status(404).json("Vídeo não encontrado!");
            }else{
                res.json(video);
            }
        },
        function(erro){
            res.status(500).json(erro);
        }
    );
};
module.exports.atualiza = function(req, res){
    var id = req.params.id;
    Video.updateOne({"_id":id}, req.body).then(
        function(video){
            res.json(video);
        },
        function(erro){
            res.status(500).json(erro);
        }
    );
};
module.exports.listaInicio = function(req, res){
    Video.find().sort({'dataPublicacao':'-1'}).limit(4).exec().then(
        function(videos){
            res.json(videos);
        },
        function(erro){
            res.status(500).json(erro);
        }
    );
};
module.exports.pesquisa = function(req, res){
    var str = JSON.parse(req.params.id);
    var qtdVideos = 0;
    Video.find({"tag": {$regex: str.busca}}).sort({"dataPublicacao":"-1"}).countDocuments().exec().then(
        function(videos){
            contaVideos(videos);
        },
        function(erro){
            res.status(500).json(erro);
        }
    );
    function contaVideos(evento){
        qtdVideos = evento;
    }
    Video.find({"tag": {$regex: str.busca}}).skip(str.pagina*10).limit(10).sort({"dataPublicacao":"-1"}).exec().then(
        function(videos){
            res.json({videos: videos, total: qtdVideos+" resultados foram encontrados"});
        },
        function(erro){
            res.status(500).json(erro);
        }
    );
};