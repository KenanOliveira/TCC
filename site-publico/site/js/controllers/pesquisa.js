angular.module('site').controller('pesquisaCtrl', function($http, $scope, $routeParams){
    var urlServidor = "http://localhost:3000/pesquisa/"
    if($routeParams.id){
        $scope.titulo = $routeParams.id;
        var intervalo = 0;
        var dados = {
            busca: $routeParams.id,
            pagina: 0
        };
        var carregaBusca = function(){
            $http.get(urlServidor+JSON.stringify(dados)).then(
                function(resposta){
                    $scope.videos = resposta.data.videos;
                    $scope.resultados = resposta.data.total;
                    verificaPaginas($scope.resultados);
                    $scope.pagina = dados.pagina + 1;
                }
            );
        };
        carregaBusca();
        var verificaPaginas = function(evento){
            intervalo = (parseInt(evento)/10) - dados.pagina;
            $scope.ctrlPaginas = function(){
                if((parseInt(evento)/10) > 1){
                    return false;
                }else{
                    return true;
                }
            }
        };
        $scope.proximo = function(){
            if(intervalo > 1){
                dados.pagina += 1;
                carregaBusca();
            }
        };
        $scope.anterior = function(){
            if(dados.pagina > 0){
                dados.pagina -= 1;
                carregaBusca();
            }
        }
        var conteudo = document.getElementById('conteudo');
        console.log(conteudo);
    }
});