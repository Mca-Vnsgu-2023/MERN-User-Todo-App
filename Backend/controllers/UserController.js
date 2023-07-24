const User = require('../model/UserModel')
var jwt = require('jsonwebtoken')

exports.postCreateUser = (req, res) => {
    User.create(req.body)
        .then((data) => res.json({ message: "User created successfully", data }))
        .catch((err) =>
            res.status(400)
                .json({ message: "Failed to add User", error: err.message })
        );
};

exports.postUserLogin = (req, res) => {
    User.findOne(req.body)
        .then((data) => {
            if (!data) {
                return res.json({ message: "Invalid User." })
            } else {
                const user = {
                    _id: data?._id,
                    username: data?.username,
                    useremail: data?.email
                }
                const token = jwt.sign(user, process.env.JWT_SECRET_KEY);
                return res.json({ message: "User Login Successfully.", user, token })
            }
        })
        .catch((err) =>
            res.status(400)
                .json({ message: "Failed to User Login", error: err.message })
        );
}

exports.getAllUser=(req,res)=>{
    User.find()
        .then((data)=>{
            if(!data){
                return res.json({message: "No data found."})
            }else{
                return res.json({data})
            }
        })
        .catch((err) =>
            res.status(400)
                .json({ message: "Failed to load data.", error: err.message })
        );
}
