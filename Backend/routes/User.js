const express=require("express");
const router=express.Router();
router.use(express.json());
const {postCreateUser,postUserLogin,getAllUser} =require('../controllers/UserController')

router.post('/register',postCreateUser)
router.post('/login',postUserLogin)
router.get('/getAllUser',getAllUser)

// router.get('/GetAllUser', async(req,res)=>{
//     const UserList=await User.find();
//     if(UserList.length ===0){
//         res.send({message: "No data found"})
//     }
//     return res.send({data: UserList})
// })

module.exports = router
