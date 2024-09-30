const express = require('express');
const router = express.Router();
const UserController = require('../controller/UserController')
const TaskController = require('../controller/TaskController')
const AuthverifyMiddleware = require('../middleware/AuthVerifymiddleware')

router.post('/registration', UserController.UserRegistration)

router.post('/login', UserController.login)
router.post('/update-profile', AuthverifyMiddleware, UserController.updateProfileDetails)
router.get('/logout', AuthverifyMiddleware, UserController.logout)
router.get('/read-profile', AuthverifyMiddleware, UserController.ReadProfile)

//task
router.post('/create-task', AuthverifyMiddleware, TaskController.CreateTask)
router.get('/update-task-status/:id/:status', AuthverifyMiddleware, TaskController.updateTaskStatus)
router.get('/read-Task', AuthverifyMiddleware, TaskController.readTask)
router.get('/ListByStatus/:status', AuthverifyMiddleware, TaskController.ListByStatus)
router.get('/TaskStatusCount', AuthverifyMiddleware, TaskController.TaskStatusCount)


module.exports = router