//Basic configuration
var express         = require('express');
const request       = require('request');
const morgan        = require('morgan')
const axios         = require('axios'); //Api call npm
const  cors         = require('cors')
var router = express.Router();
router.use(morgan('combined'))
router.use(cors())


router.get('/login',(req,res ,next) => {
  console.log('login')
  console.log(req.query,req.params)
   res.json({success:1,status:200,msg:"login successfully",data:req.query,isLoggedIn:1});
  next()
})
  
module.exports = router;