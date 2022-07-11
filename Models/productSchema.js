const mongoose =  require('mongoose');

const productSchema = new mongoose.Schema({

    pname:{
        type:String
    },
    pprice:{
        type:Number
    },
    pdesc:{
        type:String
    },
    pimage:{
        type:String
    }
});

const product = new mongoose.model('product',productSchema);

module.exports = product ;