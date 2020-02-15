angular.module('site').controller('atualizarCtrl', function($scope, $http, $routeParams){
    var carregaDados = function(){
        var urlServidor = "http://localhost:3000/busca/";
        $http.get(urlServidor+$routeParams.id).then(
            function(resposta){
                var dados = resposta.data;
                $scope.titulo = dados.titulo;
                $scope.link = dados.link;
                $scope.desc = dados.descricao;
                $scope.tags = dados.tag;
            }
        );
    };
    carregaDados();
    $scope.atualizarVideo = function(){
        var urlServidor = "http://localhost:3000/atualiza/";
        var tags = analiseTags($scope.tags);
        var link = corrigeLink($scope.link);
        var dados = {
            titulo: $scope.titulo,
            link: link,
            descricao: $scope.desc,
            tag: tags,
            dataPublicacao: new Date()
        }
        $http.put(urlServidor+$routeParams.id, JSON.stringify(dados)).then(
            function(videos){
                console.log(videos);
            },
            function(erro){
                console.log(erro);
            }
        );
    };

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
});