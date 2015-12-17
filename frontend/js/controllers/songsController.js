angular
  .module('BeatSity')
  .controller('SongsController', SongsController);

SongsController.$inject = ['Song', '$state', 'currentUser'];
function SongsController(Song, $state, currentUser){
  this.controllerName = "SongsController";

  var self         = this;
  self.all         = [];
  self.newSong     = {};
  self.getSongs    = getSongs;
  self.add         = add;
  self.currentUser = currentUser.getUser();

  getSongs();
  function getSongs(){
    Song.query(function(data){
      self.all = data.songs;
    })
  }

  function add(){
    self.newSong.user_id = self.currentUser._id;
    Song.save(self.newSong, function(data){
      $state.go("songs");
    })
  }
}