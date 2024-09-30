const  mongoose=require('mongoose');
const DataSchema=mongoose.Schema({
    email:{type:String,unique:true},
    firstName:{type:String},
    lastName:{type:String},
    mobile:{type:String},
    password:{type:String},
    photo:{type:String, default:'https://www.testhouse.net/wp-content/uploads/2021/11/default-avatar.jpg'},
    
},{timestamps: true,versionKey:false});
const UsersModel=mongoose.model('users',DataSchema);
module.exports=UsersModel

