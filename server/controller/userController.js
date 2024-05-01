const User = require('../models/User');

module.exports.fetchUser=async(req,res)=>{
    const user=await User.findById(req.user.id);
    res.json(user);
}