pouchPutDemo.controller('PeopleController', function($log, $scope, pouchDB, PeopleService) {
  PeopleService.logInfo();
  
  $scope.allPeople = [];
  PeopleService.getAll().then(function(result){
    $scope.allPeople = result.rows;
  });
  
  $scope.newPerson = {
    name: '',
    country: ''
  };
  
  $scope.addPerson = function () {
    console.log('addPerson called');
    if ($scope.newPerson.name.length && $scope.newPerson.country.length) {
        console.log('Saving', $scope.newPerson);
        PeopleService.addPerson($scope.newPerson);
        $scope.newPerson = {};
    } else {
        console.log('inputs empty, abort');
    }
  };
});
