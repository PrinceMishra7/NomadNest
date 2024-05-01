const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports.register=async(req,res)=>{
    const {firstName,lastName,email,password,locationText,latitude,longitude}=req.body;
    console.log(firstName,email,password);
    // Hash the password
    const salt=await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // create new user
    const user=new User({
        firstName,lastName,email,password:hashedPassword,locationText,latitude,longitude
    });
    
    // save user and return response
    user.save().then(user=>{
        return res.status(200).json({
            success:true,
            data:user
        });
    }).catch(err=>{
        console.log(err.message);
        return res.status(500).json({
            success:false,
            message:'unable to create account'
        });
    });
}

module.exports.login=async(req,res)=>{
    const {email,password}=req.body;
    console.log(email,password);

    // find user with email


    try {
        const user=await User.findOne({email});
        if(!user){
            res.status(400).json({error: "User doesn't exist"})
        }
        const validPassword=await bcrypt.compare(password,user.password);
        if(!validPassword){
            res.status(400).json({error: "Invalid password"})
        }
        console.log(user);

        // create token data

        const tokenData={
            id:user._id,
            firstName:user.firstName,
            email:user.email
        }


        // create token

        const token= await jwt.sign(tokenData,process.env.TOKEN_SECRET,{expiresIn:24*60*60*1000})
        
        res.cookie('jwt', token, { httpOnly: false, maxAge: 24 * 60 * 60 * 1000, secure: true, sameSite: 'None' });

        res.status(200).json({userId:user._id,token});
    } 
    catch (error) {
        res.status(400).json({error:"User doesn't exist"})
    }

}

// logout
module.exports.logout=async(req,res)=>{
    res.cookie('jwt', '', { maxAge: 1 });
    res.status(200).json({message:'logged out'});
}
    