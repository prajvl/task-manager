const express = require('express');
const Todo = require('../models/Todo');
const auth = require('../middleware/auth');
const { createTodoValidation, updateTodoValidation, handleValidationErrors } = require('../validators/todoValidator');

const router = express.Router();

router.get('/', auth, async (req, res, next) => {
    try {
        const tasks = await Todo.find({ user: req.user }).sort({ createdAt: -1 });
        res.json({ 
            message: 'Tasks retrieved successfully',
            tasks,
            count: tasks.length
        });
    } catch (err) {
        next(err);
    }
});

router.post('/', auth, createTodoValidation, handleValidationErrors, async (req, res, next) => {
    try {
        const { title, description, status = 'pending' } = req.body;
        const task = new Todo({ 
            title, 
            description, 
            status, 
            user: req.user,
            completed: status === 'completed'
        });
        await task.save();
        res.status(201).json({ 
            message: 'Task created successfully',
            task
        });
    } catch (err) {
        next(err);
    }
});

router.put('/:id', auth, updateTodoValidation, handleValidationErrors, async (req, res, next) => {
    try {
        const { title, description, status, completed } = req.body;
        
        let finalStatus = status;
        if (completed !== undefined && !status) {
            finalStatus = completed ? 'completed' : 'pending';
        }
        
        const task = await Todo.findOneAndUpdate(
            { _id: req.params.id, user: req.user },
            { title, description, status: finalStatus, completed: finalStatus === 'completed' },
            { new: true, runValidators: true }
        );
        
        if (!task) {
            return res.status(404).json({ 
                message: 'Task not found or you do not have permission to update it'
            });
        }
        
        res.json({ 
            message: 'Task updated successfully',
            task
        });
    } catch (err) {
        next(err);
    }
});

// Delete task
router.delete('/:id', auth, async (req, res, next) => {
    try {
        const task = await Todo.findOneAndDelete({ _id: req.params.id, user: req.user });
        
        if (!task) {
            return res.status(404).json({ 
                message: 'Task not found or you do not have permission to delete it'
            });
        }
        
        res.json({ 
            message: 'Task deleted successfully',
            deletedTask: { id: task._id, title: task.title }
        });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
