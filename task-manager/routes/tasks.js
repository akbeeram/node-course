const express = require('express');
const { getAllTasks, createTask, deleteTask, updateTask, getTask } = require('../controllers/tasks');
const router = express.Router();


router.route('/').get(getAllTasks).post(createTask)
router.route('/:id').delete(deleteTask).patch(updateTask).get(getTask)

module.exports = router;