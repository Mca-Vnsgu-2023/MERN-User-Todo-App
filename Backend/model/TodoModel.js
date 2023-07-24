const mongoose=require("mongoose")

const TodoSchema= mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    task:String,
    description:String,
    status: String,
});

const TodoModel= mongoose.model("Todo" ,TodoSchema)

module.exports=TodoModel