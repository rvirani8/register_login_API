var express = require('express');
var router = express.Router();

const bcrypt = require('bcrypt');

const register = require('../Models/RegisterSchema');
const product = require('../Models/productSchema');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });


router.post('/register', async function (req,res) {

  try {
    const password = req.body.password;
    const confirm_password = req.body.confirm_password;
    const passwordhash = await bcrypt.hash(password, 10);

  if(password == confirm_password){
    const data = {
      Name: req.body.Name,
      email: req.body.email,
      password : passwordhash
    }
    const registerdata = await register.create(data);
    res.status(201).json({
      "status":"success",
      data:registerdata 
    })
  }else{
    console.log("password not match");
  }
  } catch (error) {  
    res.json({
      err:error
    })
  }
});


router.post('/login', async function(req, res, next) {

  try {
    const password = req.body.password;
    const logindata = await register.findOne({email:req.body.email});
   
    const result = await  bcrypt.compare(password,logindata.password);

    if(result){
      res.status(201).json({
        "status":"sucess",
        data:logindata
      })
    }else{
      console.log('Your password not matched.');
    } 
  } catch (error) {
    res.json({
      err:error
    })
  }
});

router.post('/addproduct', async function (req,res) {
  
  try {
    const productdata = await product.create(req.body)
    res.status(201).json({
      "status":"success",
      data:productdata
    })
  } catch (error) {
    res.json({
      err:error
    })
  }
});

router.get('/productview', async function (req,res) {
  
  try {
    const data = await product.find(req.body)
    res.status(200).json({ 
      data
    })
 
  } catch (error) { 
   console.log(error);
  }

});

router.delete('/delete/:id',async function (req,res) {
  
  try {
    const data = await product.findByIdAndDelete(req.params.id);
    console.log("delele data");
  
  } catch (error) {

    console.log(error);
  }
  
});

router.patch('/edit/:id',async function (req,res) {
  
  try {
    const data = await product.findByIdAndUpdate(req.params.id,req.body);
    res.status(202).json({
      data
    })
  } catch (error) {

    console.log(error);
  }
  
});

module.exports = router;
