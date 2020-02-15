angular.module('site').controller('usuarioCtrl', function($scope, $http, $localStorage){
    $scope.cadUsuario = function(){
        var urlServidor = "http://localhost:3000/cadastra";
        var dados = {
            nome: $scope.user,
            pwd: $scope.pwd
        };
        $http.post(urlServidor, JSON.stringify(dados)).then(
            function(resposta){
                console.log(resposta);
            },
            function(erro){
                console.log(erro);
            }
        );
    }
    $scope.authUsuario = function(){
        var urlServidor = "http://localhost:3000/logar";
        var dados = {
            nome: $scope.user,
            pwd: $scope.pwd
        };
        $http.post(urlServidor, JSON.stringify(dados)).then(
            function(resposta){
                if(resposta.data == 2){
                    $scope.alerta = "Senha incorreta";
                    setTimeout(limpa, 1000);
                }else if(resposta.data == 1){
                    $scope.alerta = "Usuário não encontrado!";
                    setTimeout(limpa, 1000);
                }else if(resposta.data.token){
                    $scope.sucesso = "Logado com sucesso";
                    $localStorage.token = resposta.data.token;
                    $localStorage.nome = resposta.data.nome;
                    $localStorage.data = resposta.data.validade;
                    window.location.assign("#!/gerenciar");
                }
            },
            function(erro){
                $scope.erro = "Falha na conexão!"+erro;
                setTimeout(limpa, 1000);
            }
        );
        function limpa(){
            $scope.erro = null;
            $scope.sucesso = null;
            $scope.alerta = null;
        }
    }
});