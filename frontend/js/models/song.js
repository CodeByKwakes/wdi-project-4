angular
  .module('BeatSity')
  .factory('Song', Song);

Song.$inject = ['$resource', 'API'];
function Song($resource, API){

  return $resource(
    API+'/songs/:id',
    {id: '@id'},
    { 'get':       { method: 'GET' },
      'save':      { method: 'POST' },
      'query':     { method: 'GET', isArray: true},
      'remove':    { method: 'DELETE' },
      'delete':    { method: 'DELETE' },
    }
  );

}