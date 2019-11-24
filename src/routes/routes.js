var express = require('express');
var router = express.Router();
var userCtrl = require('../controllers/user-controller.js');
var operatorCtrl = require('../controllers/operator-controller.js');
var categoryCtrl = require('../controllers/categories-controller.js');
var path = require('path');
var sessionstorage = require('sessionstorage');

router.get('/', function(req, res) {
    res.render('login');
});

router.get('/home', function(req, res) {
    console.log(sessionstorage.getItem('role'));
    var btnColor = 'success';
    res.render('home', {btnColor});
});

router.get('/getoperatorform', function(req, res) {
    res.render(path.join('operator/add-operator'));
});

router.route('/home').post(userCtrl.userLogin);

router.route('/getallusers').get(userCtrl.getAllusers);

router.get('/getcategories', categoryCtrl.getCategoriesData);

router.post('/getsubcategories', categoryCtrl.getSubcategoriesData);

router.post('/getreasons', categoryCtrl.getReasonsData);

module.exports = router;