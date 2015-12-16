angular
  .module('BeatSity')
  .factory('Producer', Producer);

Producer.$inject = ['$resource', 'API'];
function Producer($resource, API){

  return $resource(
    API+'/producers/:id',
    {id: '@id'},
    { 'get':       { method: 'GET' },
      'save':      { method: 'POST' },
      'query':     { method: 'GET', isArray: true},
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