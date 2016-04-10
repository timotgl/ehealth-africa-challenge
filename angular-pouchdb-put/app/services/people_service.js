pouchPutDemo.service('PeopleService', function(pouchDB) {
  var db = pouchDB('people');
  
  this.logInfo = function() {
      db.info().then(function(result) {
        console.log(result);
      });
      db.allDocs({include_docs: true}).then(function(result) {
        result.rows.forEach(function(row) {
          console.log(row.doc);
        });
      });
  };
  
  this.getAll = function() {
    return db.allDocs({include_docs: true});
  };
  
  this.addPerson = function(person) {
    db.post(person);
    /*
      .then(get)
      .then(bind)
      .catch(error);
    */
  };
  
  function error(err) {
    $log.error(err);
  }

  function get(res) {
    if (!res.ok) {
      return error(res);
    }
    var response = db.get(res.id);
    console.log('get: response=', response);
    return response;
  }

  function bind(res) {
    $scope.doc = res;
  }
});
