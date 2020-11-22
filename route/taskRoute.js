const {Router} = require('express');
const router = Router();
const taskController = require('../controller/taskController');

router.get('/', taskController.task_all_get);

router.post('/', taskController.task_all_post);

router.get('/create', taskController.task_create_get);

router.get('/:id', taskController.task_detail_get);

router.delete('/:id', taskController.task_detail_delete);

  module.exports = router;
