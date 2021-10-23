const mongoose = require('mongoose');

// const connectionString = 'mongodb+srv://anell:Apache@cluster0.boi4h.mongodb.net/task-manager?retryWrites=true&w=majority';

const connectDB = (url) => {
return mongoose.connect(url);
}
module.exports = connectDB;