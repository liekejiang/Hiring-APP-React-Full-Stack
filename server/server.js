const express = require('express');
const mongoose = require('mongoose');
// connect mongo

const DB_URL = 'mongodb://localhost:27017/imooc';
mongoose.connect(DB_URL);
mongoose.connection.on('connected', function(){
    console.log('mongo connect success');
})

const User = mongoose.model('user', new mongoose.Schema({
    user:{type:String, require:true},
    age:{type:Number, require: true},

}))

User.update({'name':'2b'}, {'$set':{age:26}}, function(err,doc){
    console.log(doc);
})

// User.remove({age:18}, function(err,doc){
//     console.log(doc);
// } )

// User.create({
//     name: 'imooc',
//     age:18,
// }, function(err, doc){
//     if(!err){
//         console.log(doc);
//     }else{
//         console.log(err);
//     }
// })



const app = express();
app.get('/', function(req, res){
    res.send('<h1>Hello world</h1>')
})

app.get('/data', function(req, res){
    User.find({}, function(err,doc){
        res.json(doc)
    })
    // res.json({name: 'imooc', type: 'IT'})
})



app.listen(9093, function(){
    console.log('Node app start at prot 9093');
}) 