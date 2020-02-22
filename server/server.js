const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// connect mongo
const app = express();
const userRouter = require('./user');

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

//只要前缀是user的 路由由userRouter控制
app.use('/user', userRouter);
app.get('/', function(req, res){
    res.send('<h1>Hello world</h1>')
})

app.listen(9093, function(){
    console.log('Node app start at prot 9093');
}) 