const express = require('express');
const passport = require('passport');

const AuthController = require('../controller/AuthController');
const TodoListController = require('../controller/TodoListController');
const AddTodoController = require('../controller/AddTodoController');
const DelTodoController = require('../controller/DelTodoController');
const PatchTodoController = require('../controller/PatchTodoController');
const GetDefaultController = require('../controller/GetDefaultController');

const router = express.Router();

router.get(
    '/auth/google', 
    passport.authenticate('google', {
        scope: ['profile', 'email','https://www.googleapis.com/auth/calendar','https://www.googleapis.com/auth/calendar.readonly']
    })
)

router.get(
    '/auth/googleback', 
    AuthController.googleCallBack
);

router.get('/todolist', TodoListController.list);
router.post('/todolist', AddTodoController.add);
router.delete('/todolist', DelTodoController.del);
router.patch('/todolist', PatchTodoController.put);
router.get('/todolist/:id', GetDefaultController.get);

module.exports = router;