const {Router} = require('express')
const {authenticateToken} = require('../middleware/authenticateToken');
const router=Router();
const userController=require('../controller/userController')
router.get('/user',authenticateToken,userController.fetchUser)
module.exports=router