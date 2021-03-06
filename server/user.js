const express = require('express');
const Router = express.Router();
const models = require('./model');
const utils = require('utility');
const User = models.getModel('user');
const _filter = { 'pwd': 0, __v: 0 };
const Chat = models.getModel('chat');

// User.remove({}, function (e, d) { });
Chat.remove({}, function (e, d) { });



Router.get('/info', function (req, res) {
    const { userid } = req.cookies;
    if (!userid) {
        return res.json({ code: 1 })
    }
    User.findOne({ _id: userid }, function (err, doc) {
        if (err) {
            return res.json({ code: 1, msg: "error happens and try again plz" });
        }
        if (doc) {
            return res.json({ code: 0, data: doc });
        }
    })
}
);

Router.get('/list', function (req, res) {
    const { type } = req.query


    User.find({ type }, function (err, doc) {
        return res.json({ code: 0, data: doc });
    })
});

Router.get('/listall', function (req, res) {
    User.find({}, function (err, doc) {
        return res.json({ code: 0, data: doc });
    })
});


Router.post('/register', function (req, res) {

    const { user, pwd, type } = req.body;

    //usernames can not be the same
    User.findOne({ user: user }, _filter, function (err, doc) {

        if (doc) {
            return res.json({ code: 1, msg: 'username is invalid' })
        }
        //register process
        const userModel = new User({ user, type, pwd: md5Pwd(pwd) });
        userModel.save(function (e, d) {
            if (e || err) {
                return res.json({ code: 1, msg: "error happens, try again plz" });
            }
            const { user, type, _id } = d
            res.cookie('userid', _id);
            return res.json({ code: 0, data: { user, type, _id } });
        })
    })
})

Router.post('/login', function (req, res) {
    const { user, pwd } = req.body;

    //usernames can not be the same
    User.findOne({ user: user, pwd: md5Pwd(pwd) }, _filter, function (err, doc) {

        if (!doc) {
            return res.json({ code: 1, msg: 'username or password is invalid' })
        }
        //keep cookie
        res.cookie('userid', doc._id);

        //login success 
        return res.json({ code: 0, data: doc })

    })
})

Router.post('/update', function (req, res) {
    // console.log(req.cookies);
    const userid = req.cookies.userid;
    if (!userid) {
        return json.dumps({ code: 1 });
    }

    const body = req.body;
    User.findByIdAndUpdate(userid, body, function (err, doc) {
        const data = Object.assign({}, {
            user: doc.user,
            type: doc.type,
        }, body);

        return res.json({ code: 0, data });
    })
})

Router.get('/getmsglist', function (req, res) {
    const user = req.cookies.userid;

    User.find({}, function (e, userdoc) {
        let users = {}
        userdoc.forEach(v => {
            users[v._id] = { name: v.user, avatar: v.avatar };
        })

        Chat.find({'$or':[{from:user}, {to:user}]}, function (err, doc) {
            if (!err) {
                return res.json({ code: 0, msgs: doc, users:users })
            }
        })

    })
})


function md5Pwd(pwd) {
    const salt = "veliveligood@#$fsdfaer4235";
    return utils.md5(utils.md5(pwd + salt));
}

module.exports = Router;  