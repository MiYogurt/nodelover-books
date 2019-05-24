# given input query with named parameters

it should build corresponding query with `?` placeholders and fill array of parameters from input object

```js
  var compile = require('..')();

  var query = 'Select users.json,EXISTS(Select 1 from moderators where moderators.id = :id) as is_moderator from users where users.id = :id and users.status = :status and users.complete_status = :complete_status';

  compile(query, {id: 123, status: 'Yes!', complete_status: 'No!'})
    .should.eql([ 'Select users.json,EXISTS(Select 1 from moderators where moderators.id = ?) as is_moderator from users where users.id = ? and users.status = ? and users.complete_status = ?',
 [ 123, 123, 'Yes!', 'No!' ] ]);

  // from https://github.com/sidorares/named-placeholders/issues/2
  query = 'SELECT * FROM items WHERE id = :id AND deleted = "0000-00-00 00:00:00"';
  compile(query, { id: Number(123) })
    .should.eql([ 'SELECT * FROM items WHERE id = ? AND deleted = "0000-00-00 00:00:00"',
  [ 123 ] ]);

  query = 'SELECT * FROM items WHERE deleted = "0000-00-00 00:00:00" AND id = :id';
  compile(query, { id: Number(123) })
    .should.eql([ 'SELECT * FROM items WHERE deleted = "0000-00-00 00:00:00" AND id = ?',
  [ 123 ] ]);
```

it should throw error when query contains placeholders but parameters object not passed

```js
var compile = require('..')();
var assert = require('assert');
query = 'test ::p2 test :p1';

assert.throws(
  function() {
    compile(query);
  },
  /Named query contains placeholders, but parameters object is undefined/
);
```

it should replace ::name style placeholders with `??` placeholders

```js
  var compile = require('..')();

  var query = 'normal placeholder :p1 and double semicolon ::p2';
  compile(query, {p1: 'test1', p2: 'test2'})
    .should.eql([ 'normal placeholder ? and double semicolon ??', [ 'test1', 'test2' ] ]);

  query = 'normal placeholder ::p1 and double semicolon :p2';
  compile(query, {p1: 'test1', p2: 'test2'})
    .should.eql([ 'normal placeholder ?? and double semicolon ?', [ 'test1', 'test2' ] ]);

  query = 'normal placeholder ::p2 and double semicolon :p1';
  compile(query, {p1: 'test1', p2: 'test2'})
    .should.eql([ 'normal placeholder ?? and double semicolon ?', [ 'test2', 'test1' ] ]);

  query = 'normal placeholder :p1 and double semicolon ::p2 test';
  compile(query, {p1: 'test1', p2: 'test2'})
    .should.eql([ 'normal placeholder ? and double semicolon ?? test', [ 'test1', 'test2' ] ]);
```


# postgres-style toNumbered conversion

basic test

```js
  var toNumbered = require('..').toNumbered;
  var query = 'SELECT usr.p_pause_stop_track(:doc_dtl_id, :plan_id, :wc_id, 20, :time_from)';
  toNumbered(query, {
    doc_dtl_id: 123,
    time_from: 345,
    plan_id: 456,
    wc_id: 678
  }).should.eql([ 'SELECT usr.p_pause_stop_track($1, $2, $3, 20, $4)', [ 123, 456, 678, 345 ]]);

```
