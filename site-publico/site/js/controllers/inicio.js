angular.module('site').controller('inicioCtrl', function($scope, $http){
    var urlServidor = "http://localhost:3000/listaInicio";
    $scope.carregaVideos = function(){
        veriTela();
        $http.get(urlServidor).then(
            function(resposta){
                $scope.videos = resposta.data;
            },
            function(erro){
                console.log(erro);
            }
        );
    }
    $scope.pesquisa = function(){
        var auxBusca = $scope.busca;
        if(auxBusca != undefined && auxBusca != " "){
            window.location.assign("#!/pesquisa/"+auxBusca);
        }
    }
});
function veriTela(){
    var conteudo = document.getElementById('conteudo');
    var url = window.location.href;
    var width = window.innerWidth;
    if(url.match("inicio") && width >= 576){
        conteudo.style.height = "100%";
    }else{
        conteudo.style.height = "100% auto";
    }
}