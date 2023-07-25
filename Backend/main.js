require("dotenv").config();

const express=require("express");
const monogoose= require("mongoose");
const cors= require("cors")

const app=express();

const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")

app.use(express.Router())

const port =  process.env.PORT || 5000
const UserRoute=require('./routes/User');
const TodoRoute=require('./routes/Todo');

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use('/api/User', UserRoute)
app.use('/api/Todo', TodoRoute)

app.get('/',(req,res)=>{
    res.send("Hello ..!")
})

monogoose.connect(process.env.MONGOURL).then(()=>console.log("MongoDB connected successfully."))

app.listen(port,()=>console.log(`server is running on http://localhost:${port}` ))
