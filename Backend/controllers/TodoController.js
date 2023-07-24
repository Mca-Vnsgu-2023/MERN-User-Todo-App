const Todo = require('../model/TodoModel')

exports.postCreateTodo = (req, res) => {
    Todo.create(req.body)
        .then((data) => res.json({ message: "Task add successfully", data }))
        .catch((err) =>
            res.status(400)
                .json({ message: "Failed to add task", error: err.message })
        );
};

exports.getAllTodos = async (req, res) => {
    await Todo.find()
        .then((data) => {
            if (!data) {
                return res.json({ message: "No data found." })
            } else {
                return res.json({ data })
            }
        })
        .catch((err) =>
            res.status(400)
                .json({ message: "Failed to load data.", error: err.message })
        );
}

exports.getTodoById=(req,res)=>{
    const todoId=req.params.id.toString()
    Todo.findOne({"_id": todoId})
    .then((data) => {
        if (!data) {
            return res.json({ message: "No data found." })
        } else {
            return res.json({ data })
        }
    })
    .catch((err) =>
        res.status(400)
            .json({ message: "Failed to load data.", error: err.message })
    );
}

exports.getTodosByUserId = async (req, res) => {
    const userId = req.params.userId.toString()
    Todo.find({ "userId": userId })
        .then((data) => {
            if (!data) {
                return res.json({ message: "No data found." })
            } else {
                return res.json(data)
            }
        })
        .catch((err) =>
            res.status(400)
                .json({ message: "Failed to load data.", error: err.message })
        );
}

exports.putUpdateTodo = (req, res) => {
    const todoId=req.params.id.toString()
    Todo.findByIdAndUpdate({"_id": todoId}, req.body)
        .then((data) => res.json({ message: "Updated successfully", data }))
        .catch((err) =>
            res
                .status(400)
                .json({ message: "Failed to update todo", error: err.message })
        );
};

exports.deleteTodo = (req, res) => {
    const todoId=req.params.id.toString()
    Todo.deleteOne({"_id": todoId})
        .then((data) =>
            res.json({ message: "Todo deleted successfully", data })
        )
        .catch((err) =>
            res
                .status(404)
                .json({ message: "Not found", error: err.message })
        );
};