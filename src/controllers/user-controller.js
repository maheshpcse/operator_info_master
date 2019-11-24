var db = require('../config/db.js');
var config = require('../config/config.js');
var dateFormat = require('dateformat');
var jwt = require('jsonwebtoken');
var userquery = require('../library/userquery.js');
var commonFunction = require('../library/commonfunction.js');
var login_log = require('../models/Loginlog.js');
var operator_info_master = require('../models/Operator_info_master.js');
var sessionstorage = require('sessionstorage');
var storage = require('express-session');


module.exports.userLogin = function(req, res, next) {

    console.log("request body here", req.body);

    let UserId = req.body.userId;
    let Password = req.body.password;

    // console.log("UserId is====>", UserId);
    // console.log("Password is====>", Password);
    
    let columnlist = `*`;

    let whereCond = `userid='${UserId}' AND password='${Password}'`;

    userquery.simpleselect(login_log, columnlist, whereCond, null).then(result => {

        var token = jwt.sign({
            id: result[0].userid
        }, config.db.securitykey, {
                expiresIn: 3600
            })
        let response = {
            success: true,
            message: 'Login successful',
            role: result[0].role,
            id: result[0].userId,
            token: token,
            data: result
        }
        sessionstorage.setItem('role', response.role);
        res.render('home');
        // res.status(200).json({
        //     data: response.data,
        //     success: response.success,
        //     role: response.role,
        //     id: response.userId,
        //     token: response.token
        // })
    }).catch(err => {
        console.log("error while login", err);
        let response = {
            success: false,
            message: 'Login failed',
            data: err
        }
        res.render('home');
        // res.status(200).json({
        //     success: response.success,
        //     data: response.data
        // })
    });
}


module.exports.getAllusers = function (req, res, next) {

    userquery.simpleselect(operator_info_master, `*`, null).then(result => {
        let response = {
            success: true,
            statusCode: 200,
            message: 'get users data',
            data: result
        };
        console.log("successfully getting users data");
        res.status(200).json({
            data: response.data,
            success: response.success
        })
    }).catch(err => {
        let response = {
            success: false,
            statusCode: 500,
            message: 'unable to get users data',
            data: err
        };
        console.log("error while getting users data", response.data);
        res.status(200).json({
            data: response.data,
            success: response.success
        })
    })
}