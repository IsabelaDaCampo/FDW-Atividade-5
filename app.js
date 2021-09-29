/* Criando aplicação angular */
var app = angular.module('minhaApp', []);

/* Declarando um controller para nossa aplicação */
app.controller('meuController', meuController);

/* Criando a função que será executada pelo controller */
function meuController($scope, $http) {
  //Declara uma variável scope chamada title
  $scope.title = 'Seja bem vindo.';
  $scope.apiKey = '&language=pt-BR&api_key=a1b35736a79583a39fef33408f7e1799'
  $scope.caminhoPoster = 'https://image.tmdb.org/t/p/w300';
  $scope.caminhoFoto = 'https://image.tmdb.org/t/p/original';

  //Declara uma variável para a lista de filmes de ação
  $scope.acao = [];
  $scope.comedia = [];
  $scope.romance = [];
  $scope.alta = [];
  $scope.lancamento = [];
  $scope.generos = [];
  $scope.filme = [];
  $scope.creditos = [];
  $scope.tituloFilmeBusca = [];
  $scope.nomeAtorBusca = [];
  $scope.creditosFilme = [];
  $scope.buscaTituloFilme = '';
  $scope.buscaNomeAtor = '';


  $scope.buscarFilmeCreditos = function (codigo) {
    $http
      .get(
        'https://api.themoviedb.org/3/movie/' + codigo + '/credits?api_key=a1b35736a79583a39fef33408f7e1799&language=pr-BR'
      )
      .success(function (dados) {
        console.log(dados)
        $scope.creditos = dados;
     });
  };

  $scope.listaGeneros = function(){
    $http
      .get(
        'https://api.themoviedb.org/3/genre/movie/list?api_key=a1b35736a79583a39fef33408f7e1799&language=pt-BR'
      )
      .success(function (dados) {
        $scope.generos = dados;
     });
  }

  $scope.procurarFilmesPeloAtor = function(buscaNomeAtor){
    $http
      .get(
        'https://api.themoviedb.org/3/search/person?api_key=a1b35736a79583a39fef33408f7e1799&language=pt-BR&query='+ buscaNomeAtor +'&page=1&include_adult=false'
      )
      .success(function (dados) {
        $scope.nomeAtorBusca = dados.results;
        console.log(dados.results)
     });
  }

  $scope.procurarFilmesPeloTitulo = function(buscaTituloFilme){
    $http
      .get(
        'https://api.themoviedb.org/3/search/movie?api_key=a1b35736a79583a39fef33408f7e1799&language=pt-BR&query=' + buscaTituloFilme + '&page=1&include_adult=false'
      )
      .success(function (dados) {
        $scope.tituloFilmeBusca = dados.results;
     });
  }

  $scope.buscarFilme = function (codigo) {
    $http
      .get(
        'https://api.themoviedb.org/3/movie/'+ codigo + '?' + $scope.apiKey
      )
      .success(function (dados) {
        $scope.filme = dados;
     });
  };

  $scope.buscarFilmesAcao = function () {
    $http
      .get(
        'https://api.themoviedb.org/3/discover/movie?with_genres=28'+ $scope.apiKey
      )
      .success(function (dados) {
        $scope.acao = dados.results;
      });
  };

  $scope.buscarFilmesComedia = function () {
    $http
      .get(
        'https://api.themoviedb.org/3/discover/movie?with_genres=35' + $scope.apiKey
      )
      .success(function (dados) {
        $scope.comedia = dados.results;
      });
  };

  $scope.buscarFilmesRomance = function () {
    $http
      .get(
        'https://api.themoviedb.org/3/discover/movie?with_genres=10749' + $scope.apiKey
      )
      .success(function (dados) {
        $scope.romance = dados.results;
      });
  };

  $scope.buscarFilmesAlta = function () {
    $http
      .get(
        'https://api.themoviedb.org/3/movie/top_rated?' + $scope.apiKey
      )
      .success(function (dados) {
        $scope.alta = dados.results;
      });
  };

  $scope.buscarFilmesLancamento = function () {
    $http
      .get(
        'https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2021-09-01&primary_release_date.lte=2021-09-25' + $scope.apiKey
      )
      .success(function (dados) {
        $scope.lancamento = dados.results;
      });
  };

  $scope.carregarDados = function () {
    $scope.buscarFilmesAcao();
    $scope.buscarFilmesComedia();
    $scope.buscarFilmesRomance();
    $scope.buscarFilmesAlta();
    $scope.buscarFilmesLancamento();
    $scope.buscarFilme(581726);
    $scope.listaGeneros();
  }
}
