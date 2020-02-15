angular.module('site').controller('inserirCtrl', function($scope, $http){
    var urlServidor = "http://localhost:3000/add";
    $scope.inserirVideo = function(){
        var tags = analiseTags($scope.tags);
        var link = corrigeLink($scope.link);
        var linkImg = geraLinkImagem(link);
        var dados = {
            titulo: $scope.titulo,
            link: link,
            linkImagem: linkImg,
            descricao: $scope.desc,
            tag: tags,
            dataPublicacao: new Date()
        }
        $http.post(urlServidor, JSON.stringify(dados)).then(
            function(videos){
                $scope.sucesso = "Vídeo cadastrado!";
                $scope.alerta = null;
                setTimeout(redirecionar);
            },
            function(erro){
                $scope.alerta = "Erro de conexão";
                $scope.sucesso = null;
            }
        );
    }

    function redirecionar(){
        window.location.assign("#!/gerenciar");
    }

    function corrigeLink(evento){
        var auxReplace = "";
        auxReplace = evento;
        auxReplace = auxReplace.replace('watch?v=','embed/');
        var auxLink = "";
        if(auxReplace.length > 41){
            for(var i = 0; i < 41; i++){
                auxLink += auxReplace[i];
            }
        }else{
            auxLink = auxReplace;
        }
        return auxLink;
    }
    function analiseTags(evento){
        var aux = "", auxIndividual = "", auxVetor = [];
        for(var i in evento){
            if(evento[i] != " "){
                aux += evento[i];
            }
        }
        for(var i in aux){
            if(aux[i] != "," && i < aux.length - 1){
                auxIndividual += aux[i];
            }else{
                var add = "";
                if(aux[i] != ","){
                    add = aux[i];
                }
                auxVetor.push(auxIndividual+add);
                auxIndividual = "";
            }
        }
        return auxVetor;
    }
    function geraLinkImagem(evento){
        var auxImg = "", auxConta = 0;
        for(var i in evento){
            if(auxConta == 4){
                auxImg += evento[i];
            }
            if(evento[i] == "/"){
                auxConta++;
            }
        }
        var img = "https://img.youtube.com/vi/"+auxImg+"/hqdefault.jpg";
        return img;
    }
});