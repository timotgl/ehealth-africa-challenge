pouchPutDemo.controller('PeopleController', function($log, $scope, PeopleService) {
  
  function fetchPeople() {
    PeopleService.getAll().then(function(result) {
      $scope.allPeople = result.rows;
    });
  }
  
  $scope.updatePerson = function(peopleIndex) {
    var person = $scope.allPeople[peopleIndex];
    PeopleService.update(person).then(fetchPeople);
  };
  
  $scope.addPerson = function () {
    if ($scope.newPerson.name.length && $scope.newPerson.country.length) {
      PeopleService.addPerson($scope.newPerson).then(fetchPeople);
      $scope.newPerson = {};
    }
  };

  // Log current DB content
  PeopleService.logInfo();
  
  // Initial state
  $scope.allPeople = [];
  fetchPeople();
  $scope.newPerson = {
    name: '',
    country: ''
  };
});
