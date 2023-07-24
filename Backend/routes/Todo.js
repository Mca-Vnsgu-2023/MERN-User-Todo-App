const express=require("express");
const router=express.Router();
router.use(express.json());
const {postCreateTodo,getAllTodos,getTodoById,getTodosByUserId,putUpdateTodo,deleteTodo}=require('../controllers/TodoController')

router.post('/addTodo',postCreateTodo)
router.get('/getAllTodo',getAllTodos)
router.get('/getTodoById/:id',getTodoById)
router.get('/getTodoByUserId/:userId',getTodosByUserId)
router.put("/updateTodo/:id", putUpdateTodo);
router.delete('/deleteTodo/:id',deleteTodo)

module.exports = router