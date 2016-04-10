/*
angular.service('service', function(pouchDB) {
  var db = pouchDB('name');
});
*/
pouchPutDemo.controller('DbController', function($log, $scope, pouchDB) {
  $scope.person = {
    name: '',
    country: ''
  };
  
  $scope.addPerson = function () {
    console.log('addPerson called');
    var name = $scope.person.name;
    var country = $scope.person.country;
    if (name.length && country.length) {
        console.log('Saving', name, country);
        $scope.person = {};
    } else {
        console.log('inputs empty, abort');
    }
  };
  
  var db = pouchDB('dbname');
  var doc = { name: 'David' };

  function error(err) {
    $log.error(err);
  }

  function get(res) {
    if (!res.ok) {
      return error(res);
    }
    return db.get(res.id);
  }

  function bind(res) {
    $scope.doc = res;
  }

  db.post(doc)
    .then(get)
    .then(bind)
    .catch(error);
});
