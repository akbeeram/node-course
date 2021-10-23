const mongoose = require('mongoose');

//whatever fields we have specified in our schema, 
// only those fields are passed to the DB.
//Any other properties in req body are ignored.
// const TaskSchema = new mongoose.Schema({
//     taskName: String, 
//     completed: Boolean
// })
//add validation that is applicable before inserting the document
// Object types can have built-in validators
const TaskSchema = new mongoose.Schema({
    taskName: {
        type: String,
        // required: true
        required: [true, 'Task Name cannot be empty'],//custom message
        trim: true,
        //for strings we can specify min and max validations
        // maxlength: [5, 'max 5 chars allowed']
    }, 
    completed: {
        type: Boolean,
        default: false
    }
})
module.exports = mongoose.model('Task', TaskSchema);