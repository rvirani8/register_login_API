const mongoose =  require('mongoose');

const userSchema = new mongoose.Schema({

    Name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    confirm_password:{
        type:String
    }
});

const register =  new mongoose.model('register',userSchema);

module.exports = register ;