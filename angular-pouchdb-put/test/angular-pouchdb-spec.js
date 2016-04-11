describe('angular-pouchdb', function() {
  var db;
  
  beforeEach(function() {
    var $injector = angular.injector(['ng', 'pouchdb']);
    var pouchDB = $injector.get('pouchDB');
    db = pouchDB('testDB');
  });
  
  describe('db.put', function() {
    it('performs a basic put operation', function(done) {
      var doc = {_id: 'someid', content: 'somecontent'};
      var rev;
      
      db.put(doc).then(function (saved_doc) {
        expect(saved_doc).toBeDefined();
        expect(saved_doc.rev).toBeDefined();
        rev = saved_doc.rev;
        expect(saved_doc.ok).toBe(true);
      }).finally(function() {
        db.remove(doc._id, rev).then(function (removed_doc) {
          done();
        });
      });
    });
    
    it('refuses to put the same id without _rev twice', function(done) {
      var doc = {_id: 'someid', content: 'somecontent'};
      var rev;
      
      db.put(doc).then(function(saved_doc) {
        rev = saved_doc.rev;
        db.put(doc).then(function(saved_doc) {
          expect(saved_doc).toBeUndefined();
        }).catch(function(error) {
          expect(error).toBeDefined();
          expect(error.error).toBe(true);
          expect(error.name).toEqual('conflict');
          db.remove(doc._id, rev).then(function (removed_doc) {
            done();
          });
        });
      });
    });
    
    it('can perform subsequent updates on the same document', function(done) {
      var doc = {_id: 'someid', content: 'initial_content'};
      db.put(doc).then(function(saved_doc) {
        return db.get(saved_doc.id);
      }).then(function(doc_to_put_again) {
        doc_to_put_again.content = 'changed_content';
        db.put(doc_to_put_again).then(function(saved_doc) {
          return db.get(saved_doc.id);
        }).then(function(changed_doc) {
          expect(changed_doc.content).toEqual('changed_content');
          done();
        });
      });
    });
  });
});
