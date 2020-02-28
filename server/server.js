const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// connect mongo
const app = express();
const userRouter = require('./user');

//http socket
const server = require('http').Server(app);
const io = require('socket.io')(server);

const models = require('./model');
const Chat = models.getModel('chat');

//io是全局连接， socket是本次通信请求
io.on('connection', function (socket) {
    console.log('user login')
    socket.on('sendMsg', function (data) {

        
        const { from, to, msg } = data;
        const chatid = [from, to].sort().join('_');
        Chat.create({ chatid, from, to, content: msg }, function (err, doc) {
            console.log('data', data)
            io.emit('recvmsg', Object.assign({}, doc._doc)) //!!!
        })
 
    })

})


app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

//只要前缀是user的 路由由userRouter控制
app.use('/user', userRouter);
app.get('/', function (req, res) {
    res.send('<h1>Hello world</h1>')
})

server.listen(9093, function () {
    console.log('Node app start at prot 9093');
}) 