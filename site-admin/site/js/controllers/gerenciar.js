angular.module('site').controller('gerenciarCtrl', function($scope, $http, $localStorage){
    var dados = {
        pagina: 0
    }
    var intervalo = 0;
    //funcao carrega videos cadastrados
    $scope.carregaVideos = function(){
        var urlServidor = "http://localhost:3000/listar/";
        $http.get(urlServidor+JSON.stringify(dados)).then(
            function(resposta){
                if(resposta.data == 0){
                    $scope.conteudo = function(){
                        $scope.semConteudo = "Não temos nada por aqui!";
                        return false;
                    };
                }else{
                    $scope.videos = resposta.data.video;
                    contaPaginas(resposta.data.qtdVideos);
                    $scope.nPagina = dados.pagina + 1;
                    $scope.videosCad = resposta.data.qtdVideos;
                }
            },
            function(erro){
                $scope.erroConexao = "Ocorreu um erro durante a tentativa de conexão!";
            }
        );
    }
    //funcao conta numero de paginas
    var contaPaginas = function(evento){
        intervalo = (parseInt(evento)/10) - dados.pagina;
        var qtd = evento;
        $scope.esconde = function(){
            if(qtd > 10){
                return true;
            }else{
                return false;
            }
        }
    }
    //funcao proxima pagina
    $scope.proximo = function(){
        if(intervalo > 1){
            dados.pagina += 1;
            $scope.carregaVideos();
        }
    }
    //funcao pagina anterior
    $scope.anterior = function(){
        if(dados.pagina > 0){
            dados.pagina -= 1;
            $scope.carregaVideos();
        }
    }
    //funcao deletar video
    $scope.deletaVideo = function(id){
        var urlServidor = "http://localhost:3000/remove/";
        var confirma = confirm("Deseja excluir este vídeo?");
        if(confirma == true){
            $http.delete(urlServidor+id).then(
                function(resposta){
                    console.log(resposta);
                    $scope.carregaVideos();
                },
                function(erro){
                    console.log(erro);
                }
            );
        }
    }
    //funcao redirecionar para atualizar informações do vídeo
    $scope.atualizar = function(id){
        window.location.assign("#!/atualizar/"+id);
    }
    //funcao deslogar usuário
    $scope.logout = function(){
        delete $localStorage.token;
        delete $localStorage.data;
        window.location.assign('#!/login');
    }
    //funcao verificar se o token do usuário existe para logar
    $scope.logado = function(){
        return $localStorage.token === null || $localStorage.token === undefined;
    }
    //atribuir nome a barra nome
    if($localStorage.nome){
        $scope.nome = $localStorage.nome;
    }
    //verificar data de validade do token
    $scope.verificaData = function(){
        var auxData = new Date();
        auxData.setDate(auxData.getDate());
        var data = parseInt(auxData.getTime()/1000);
        if(data > $localStorage.data){
            delete $localStorage.data;
            delete $localStorage.token;
            window.location.assign("#!/login");
        }
    }
});