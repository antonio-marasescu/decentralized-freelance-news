db.createUser({
  user: 'fabulauser',
  pwd: 'fabulapass',
  roles: [{ role: 'readWrite', db: 'fabuladb' }],
  mechanisms: ['SCRAM-SHA-1'],
});
