const express = require('express');
const Router = express.Router();

Router.get('/info', function(req, res){
    return res.json({code:1})
});

Router.get('/test', function(req, res){
    return res.json({code:12345})
});
module.exports = Router;