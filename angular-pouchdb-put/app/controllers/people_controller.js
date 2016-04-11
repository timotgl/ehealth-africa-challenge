pouchPutDemo.controller('PeopleController', function($log, $scope, PeopleService) {
  
  function fetchPeople() {
    PeopleService.getAll().then(function(result) {
      $scope.allPeople = result.rows;
    });
  }

  PeopleService.logInfo();
  
  $scope.allPeople = [];
  fetchPeople();
  $scope.newPerson = {
    name: '',
    country: ''
  };
  
  $scope.updatePerson = function(peopleIndex) {
    var person = $scope.allPeople[peopleIndex];
    console.log('updatePerson ', person);
    PeopleService.update(person).then(fetchPeople);
  };
  
  $scope.addPerson = function () {
    console.log('addPerson called');
    if ($scope.newPerson.name.length && $scope.newPerson.country.length) {
        console.log('Saving', $scope.newPerson);
        PeopleService.addPerson($scope.newPerson).then(fetchPeople);
        $scope.newPerson = {};
    } else {
        console.log('inputs empty, abort');
    }
  };
});
