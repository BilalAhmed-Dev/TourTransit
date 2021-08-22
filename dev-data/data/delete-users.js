const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Users = require('../../models/userModel');

dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log('connected!'));

/// Delete all data collections

const deleteData = async () => {
  try {
    await Users.deleteMany();

    console.log('data scuessfully deleted');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--delete') {
  deleteData();
}
