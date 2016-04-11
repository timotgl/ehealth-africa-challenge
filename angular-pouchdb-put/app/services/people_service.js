pouchPutDemo.service('PeopleService', function(pouchDB) {
  var db = pouchDB('people');
  
  this.logInfo = function() {
      db.info().then(function(result) {
        console.log(result);
      });
      db.allDocs({include_docs: true}).then(function(result) {
        result.rows.forEach(function(row) {
          console.log(row);
        });
      });
  };
  
  this.getAll = function() {
    return db.allDocs({include_docs: true});
  };
  
  this.update = function(person) {
    return db.put(person.doc);
  };
  
  this.addPerson = function(person) {
    return db.post(person);
  };
});
