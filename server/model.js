const mongoose = require('mongoose');
const DB_URL = 'mongodb://localhost:27017/imooc-chat';
mongoose.connect(DB_URL,{ useNewUrlParser: true,useUnifiedTopology: true });
mongoose.connection.on('connected', function(){
    console.log('mongo connect success');
})


const models = {
    user:{
        "user":{type:String,reuqire:true},
        "pwd":{type:String, require:true},
        "type":{type:String, require:true},
        'avatar':{type:String},
        'desc':{type:String},
        'title':{type:String},
        //boss
        'company':{type:String},
        'money':{type:String}
    },
    chat:{

    }
}

for(let m in models){
    mongoose.model(m, new mongoose.Schema(models[m]));
}

module.exports = {
    getModel:function(name){
        return mongoose.model(name);
    }
}