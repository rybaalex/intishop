db.createUser({
  user: 'root',
  pwd: 'RY045912LO',
  roles: [
    {
      role: 'dbOwner',
      db: 'delarosa',
    },
  ],
});