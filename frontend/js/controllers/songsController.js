angular
  .module('BeatSity')
  .controller('SongsController', SongsController);

SongsController.$inject = ['Song', '$state', 'currentUser'];
function SongsController(Song, $state, currentUser){
  this.controllerName = "SongsController";

  var self         = this;
  self.all         = [];
  self.song        = {};
  self.newSong     = {};
  self.getSongs    = getSongs;
  self.add         = add;
  self.currentUser = currentUser.getUser();

  // self.addSong = addSong;
  // self.deleteSong = deleteSong;

  getSongs();
  function getSongs(){
    Song.query(function(data){
      console.log(data);
      self.all = data.songs;
    })
  }

  function add(){
    self.newSong.user_id = self.currentUser._id;
    Song.save(self.newSong, function(data){
      console.log(data);
      $state.go("songs");
    })
  }

  function songReset(){
    self.song = {};
  }
}