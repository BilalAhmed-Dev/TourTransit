db = db.getSiblingDB('mydb');
db.createCollection('users');
db.users.insertMany(require('/data/users.json'));