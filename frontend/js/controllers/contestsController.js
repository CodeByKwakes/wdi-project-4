angular
  .module('BeatSity')
  .controller('ContestsController', ContestsController);

ContestsController.$inject = ['$state', 'currentUser', 'Contest'];
function ContestsController($state, currentUser, Contest){
  this.controllerName = "ContestsController";

  var self         = this;
  self.all         = [];
  self.newContest  = {};
  self.getContests = getContests;
  self.add         = add;
  self.currentUser = currentUser.getUser();

  getContests();
  function getContests(){
    Contest.query(function(data){
      self.all = data.contests;
    })
  }

  function add(){
    self.newContest.user_id = self.currentUser._id;
    Contest.save(self.newContest, function(data){
      $state.go("contests");
    })
  }
}