angular
  .module('BeatSity')
  .controller('SongsController', SongsController);

SongsController.$inject = ['Song', '$state'];

function SongsController(Song, $state){
  var self = this;
  self.all = [];
  self.song = {};
  self.addSong = addSong;
  self.newSong = {};
  self.getSongs = getSongs;
  self.deleteSong = deleteSong;


  function getSongs(){
    Song.query(function(data){
      self.all = data.songs;
    })
  }

/*  function addSong(){
    $http
      .post('http://localhost:3000/songs', self.newSong)
      .then(function(response){
        getSongs();
    });
    self.newSong = {};
  }

  function deleteSong(song){
    $http
      .delete("http://localhost:3000/songs/" + song._id)
      .then(function(response){
        var index = self.all.indexOf(song);
        self.all.splice(index, 1);
      });
  }*/

  function songReset(){
    self.song = {};
  }
  getSongs();

}