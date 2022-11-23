db.createUser({
  user: 'identityuser',
  pwd: 'identitypass',
  roles: [{ role: 'readWrite', db: 'identitydb' }],
  mechanisms: ['SCRAM-SHA-1'],
});
