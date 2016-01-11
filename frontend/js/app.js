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
        templateUrl: "js/views/home.html"
      })
      .state('login', {
        url: "/login",
        templateUrl: "js/views/login.html"
      })
      .state('register', {
        url: "/register",
        templateUrl: "js/views/register.html"
      })
      .state('users', {
        url: "/users",
        templateUrl: "js/views/users.html"
      })
      .state('profile', {
        url: "/users/:id",
        templateUrl: "js/views/profile.html",
        controller: "UsersController as users"
      })
      .state('profile.bio', {
        url: "/",
        templateUrl: "js/views/profile-bio.html",
        controller: "UsersController as users"
      })
      .state('profile.playlist', {
        url: "/playlist",
        templateUrl: "js/views/profile-playlist.html",
        controller: "UsersController as users"
      })
      .state('profile.contest', {
        url: "/contest",
        templateUrl: "js/views/profile-contest.html",
        controller: "UsersController as users"
      })
      .state('edit', {
        url: "/users/:id/edit",
        templateUrl: "js/views/userEdit.html",
        controller: "UsersController as users"
      })
      .state('songs', {
        url: "/songs",
        templateUrl: "js/views/songs.html",
        controller: "SongsController as songs"
      })
      .state('addSong', {
        url: "/songs/new",
        templateUrl: "js/views/addSong.html",
        controller: "SongsController as songs"
      })
      .state('contests', {
        url: "/contests",
        templateUrl: "js/views/contests.html",
        controller: "ContestsController as contests"
      })
      .state('addContest', {
        url: "/contests/new",
        templateUrl: "js/views/addContest.html",
        controller: "ContestsController as contests"
      })
      .state('showContest', {
        url: "/contests/:id",
        templateUrl: "js/views/showContest.html",
        controller: "ContestsController as contests"
      })

    $urlRouterProvider.otherwise("/");
  }