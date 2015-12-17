angular
  .module("BeatSity", ['ngResource', 'angular-jwt', 'ui.router'])
  .constant('API', 'http://localhost:3000/api')
  .config(MainRouter)
  .config(function($httpProvider){
    $httpProvider.interceptors.push('authInterceptor')
  })

  MainRouter.$inject = ['$stateProvider', '$urlRouterProvider'];

  function MainRouter($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: "/",
        templateUrl: "home.html"
      })
      .state('login', {
        url: "/login",
        templateUrl: "login.html"
      })
      .state('register', {
        url: "/register",
        templateUrl: "register.html"
      })
      .state('users', {
        url: "/users",
        templateUrl: "users.html"
      })
      .state('profile', {
        url: "/users/:id",
        templateUrl: "profile.html",
        controller: "UsersController as users"
      })
      .state('edit', {
        url: "/users/:id/edit",
        templateUrl: "userEdit.html",
        controller: "UsersController as users"
      })
      .state('songs', {
        url: "/songs",
        templateUrl: "songs.html",
        controller: "SongsController as songs"
      })
      .state('addSong', {
        url: "/songs/new",
        templateUrl: "addSong.html",
        controller: "SongsController as songs"
      })
      .state('contests', {
        url: "/contests",
        templateUrl: "contests.html",
        controller: "ContestsController as contests"
      })
      .state('addContest', {
        url: "/contests/new",
        templateUrl: "addContest.html",
        controller: "ContestsController as contests"
      })
      .state('showContest', {
        url: "/contests/:id",
        templateUrl: "showContest.html",
        controller: "ContestsController as contests"
      })

    $urlRouterProvider.otherwise("/");
  }