// UserController.js

const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');
const { EncodeToken } = require('../utility/TokenHelper')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId


exports.UserRegistration = async (req, res) => {
    try {
        const reqBody = req.body;
        if(await UserModel.find({email:reqBody.email}).count()===1){
            res.status(400).json({ status: "fail", keyPattern: {email: 1} });
        }else{
            const result = await UserModel.create(reqBody);
            res.status(200).json({ status: "success", data: result });
        }
    } catch (e) {
        res.status(400).json({ status: "fail", data: e.toString() });
    }
};

exports.login = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const user = await UserModel.findOne({ email: email });

        if (!user) {
            return res.status(400).json({ status: "failed", message: "Email doesn't match" });
        }

        // Check if the password matches
        if (user.password !== password) {
            return res.status(400).json({ status: 'failed', message: 'Password does not match' });
        }

        // Password matches
        let user_id = user._id.toString();
        let token = EncodeToken(email, user_id);
        let CookieOption = { expires: new Date(Date.now() + 24 * 60 * 60 * 1000), httpOnly: false };
        res.cookie('token', token, CookieOption);

        res.status(200).json({ status: "success", message: 'Login success', token: token, data: user });
    } catch (e) {
        res.status(400).json({ status: "fail", data: e.toString() });
    }
};
exports.updateProfileDetails = async (req, res) => {
    try {
        const email = req.headers.email;
        const reqBody = req.body;
        const result = await UserModel.updateOne({ email: email }, reqBody);

        res.status(200).json({ status: "success", data: result });
    } catch (e) {
        res.status(400).json({ status: "fail", data: e.toString() });
    }
};




exports.test = async(req, res)=>{
    try{
        res.status(200).json({ status: "success" });
    }catch(e){
        res.status(500).json({ status: "failed" });

    }
}

exports.logout = async(req, res)=>{
    let CookieOption = {expires: new Date(Date.now()-24*60*60*1000), httpOnly: false}
    res.cookie('token', "", CookieOption)
    res.status(200).json({ status: "success" });
}


exports.ReadProfile = async(req, res) =>{
    try{
        let user_id = req.headers.user_id
        let result = await UserModel.find({_id:user_id})
        res.status(200).json({ status: "success", data: result});
    }catch(e){
        return {status:"fail", message:"Something Went Wrong"}

    }
}