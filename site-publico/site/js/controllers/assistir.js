angular.module('site').controller('assistirCtrl', function($scope, $http, $routeParams, $sce){
    $scope.trustSrc = function (src) {
        return $sce.trustAsResourceUrl(src);
    };
    var carregaVideo = function(id){
        urlServidor = "http://localhost:3000/busca/";
        $http.get(urlServidor+id).then(
            function(resposta){
                var dados = resposta.data;
                $scope.titulo = dados.titulo;
                $scope.link = dados.link;
                $scope.descricao = dados.descricao;
                $scope.tags = "tags: "+dados.tag;
            },
            function(erro){
                console.log(erro);
            }
        );
    }
    if($routeParams.id){
        carregaVideo($routeParams.id);
    }
});