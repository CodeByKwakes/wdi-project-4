angular
  .module('BeatSity')
  .factory('Contest', Contest);

Contest.$inject = ['$resource', 'API'];
function Contest($resource, API){

  return $resource(
    API+'/contests/:id',
    {id: '@id'},
    { 'get':       { method: 'GET' },
      'save':      { method: 'POST' },
      'query':     { method: 'GET', isArray: false},
      'remove':    { method: 'DELETE' },
      'delete':    { method: 'DELETE' },
    }
  );

}