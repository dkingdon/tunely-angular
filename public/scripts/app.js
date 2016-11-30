console.log('app.js connected');

angular
  .module('tunely', ['ngRoute'])
  .config(config)

  config.$inject = ['$routeProvider', '$locationProvider'];
  function config( $routeProvider, $locationProvider ) {
    $routeProvider
      .when('/', {
        templateUrl: '/templates/albums',
        controllerAs: 'albumsIndexCtrl',
        controller: 'AlbumsIndexController'
      })
      .when('/albums/:id', {
        template: 'this template will show an album',
        controllerAs: 'albumShowCtrl',
        controller: 'AlbumsShowController'
      });

    $locationProvider.html5Mode({
      enable: true,
      requireBase: false
    });
  } //END OF CONFIG
