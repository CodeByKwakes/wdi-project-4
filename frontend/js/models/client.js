angular
  .module('BeatSity')
  .factory('Client', Client);

Client.$inject = ['$resource', 'API'];
function Client($resource, API){

  return $resource(
    API+'/clients/:id',
    {id: '@id'},
    { 'get':       { method: 'GET' },
      'save':      { method: 'POST' },
      'query':     { method: 'GET', isArray: false},
      'remove':    { method: 'DELETE' },
      'delete':    { method: 'DELETE' },
      'register': {
        url: API + '/register',
        method: "POST"
      },
      'login': {
        url: API + '/login',
        method: "POST"
      }
    }
  );
}