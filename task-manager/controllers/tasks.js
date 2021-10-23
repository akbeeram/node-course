const Task = require('./../models/tasks')
const asyncWrapper = require('./../middleware/async')
const { createCustomError } = require('../error/custom-error')

const getAllTasks = asyncWrapper(async (req, res) => {
    // try {
        const allTasks = await Task.find({})
        res.status(200).send({tasks: allTasks})
    // } catch(err) {
    //     res.status(500).json(err)
    // }
})
const createTask = asyncWrapper(async (req, res) => {
    // try {
        const task = await Task.create(req.body)
        res.status(201).json({task})
    // } catch(err) {
    //     // res.status(500).json('Unable to add Task')
    //     res.status(500).json(err)
    // }
})
const deleteTask = asyncWrapper(async (req, res) => {
    // try {
        const {id: taskId} = req.params
        const task = await Task.findOneAndDelete({_id: taskId})
        if(!task) {
            return res.status(404).json({msg: 'Task Not Found'})
        }
        res.status(200).json({task})
    // } catch(err) {
    //     res.status(500).json(err)
    // }
})
const updateTask = asyncWrapper(async (req, res) => {
    // try {
        const {id: taskId} = req.params
        //old task is returned, also this doesnt run validatino, to solve this pass the options
        const task = await Task.findOneAndUpdate({_id: taskId},req.body, {
            new: true,//returns the new updated item
            runValidators: true
        })
        if(!task) {
            res.status(404).json({msg: 'no task to update'})
        }
        res.status(200).json({msg: 'Updated'})
    // } catch(err) {
    //     res.status(500).json(err)
    // }
})
const getTask = asyncWrapper(async (req, res, next) => {
        // try {
            const task = await Task.findOne({_id: req.params.id})
            if(!task) {
                // const err = new Error('Not Found')
                // err.status = 404;
                // return next(err);
                return next(createCustomError('No Task Found', 404))
                // return res.status(404).json({msg: 'No Task Found'})
            }
            res.status(200).json({task})
        // } catch(err) {
        //     // res.status(500).json('Unable to add Task')
        //     res.status(500).json(err)
        // }
})
module.exports = {
    getAllTasks, createTask, deleteTask, updateTask, getTask
}