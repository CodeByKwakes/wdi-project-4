angular
  .module('BeatSity')
  .factory('currentUser', CurrentUser);

CurrentUser.$inject = ["TokenService"];
function CurrentUser(TokenService){

  var user = null

  return {
    getUser: function(){
      user = TokenService.decodeToken();
      console.log(user);
      return user;
    }
  }
}