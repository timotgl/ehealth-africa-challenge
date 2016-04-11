describe('angular-pouchdb', function() {
  var db;
  
  beforeEach(function() {
    var $injector = angular.injector(['ng', 'pouchdb']);
    var pouchDB = $injector.get('pouchDB');
    db = pouchDB('testDB');
  });
  
  describe('db.put', function() {

    // TODO: assert that it fails in a certain way when an _id is missing in the document
    // TODO: assert that it fails in a certain way when putting a doc that exists, but the _rev is missing or wrong (not up to date)

    // TODO: assert that it can be called repeatedly, when done correctly, and stores all _rev values
    
    it('performs a basic put operation', function(done) {
      var doc = {_id: 'someid', content: 'somecontent'};
      var rev;
      
      db.put(doc).then(function (saved_doc) {
        console.log('then called');
        expect(saved_doc).toBeDefined();
        expect(saved_doc.rev).toBeDefined();
        rev = saved_doc.rev;
        expect(saved_doc.ok).toBe(true);
      }).catch(function(error) {
        console.log('catch called');
        expect(error).toBeUndefined();
      }).finally(function() {
        console.log('finally called');
        db.remove(doc._id, rev).then(function (removed_doc) {
          console.log('removed_doc=', removed_doc);
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
          console.log('inner then');
          expect(saved_doc).toBeUndefined();
        }).catch(function(error) {
          console.log('inner catch. error=', error);
          expect(error).toBeDefined();
          expect(error.error).toBe(true);
          expect(error.name).toEqual('conflict');
          db.remove(doc._id, rev).then(function (removed_doc) {
            console.log('removed_doc=', removed_doc);
            done();
          });
        });
      });
    });
    
    it('can perform subsequent updates on the same document', function(done) {
      var doc = {_id: 'someid', content: 'initial_content'};
      var rev;
      db.put(doc).then(function(saved_doc) {
        console.log('first then handler. saved_doc=', saved_doc);
        return db.get(saved_doc.id);
      }).then(function(doc_to_put_again) {
        console.log('second then handler. doc_to_put_again=', doc_to_put_again);
        doc_to_put_again.content = 'changed_content';
        db.put(doc_to_put_again).then(function(saved_doc) {
          console.log('third then handler. saved_doc=', saved_doc);
          return db.get(saved_doc.id);
        }).then(function(changed_doc) {
          console.log('fourth then handler. changed_doc=', changed_doc);
          expect(changed_doc.content).toEqual('changed_content');
          done();
        });
      });
    });
  });
});
