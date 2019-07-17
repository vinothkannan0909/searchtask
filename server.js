'use strict';
const express = require('express');
const http = require('http');
const app     = express();
const router  = require('./router/router.js') 
const request       = require('request');
const morgan        = require('morgan')
const axios         = require('axios'); //Api call npm
const cors         = require('cors');
const bodyParser = require('body-parser')
//app.use(morgan('combined'))
app.use(cors())
app.use(express.static('public'))
app.set('port', process.env.PORT || 8081); //port 
app.set('host', process.env.HOST || '172.16.25.199'); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/',router) //router configuration

//server run 
http.createServer(app).listen(app.get('port'), app.get('host'), function() {

    console.log("server listening on url  http://"  + app.get('host') + ':'+ app.get('port'));
  
});

// app.get('/login',function(req,res){
//     console.log('login =>',req,'form =>',req.query)
// })
