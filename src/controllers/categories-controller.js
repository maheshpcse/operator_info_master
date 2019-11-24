var dateFormat = require('dateformat');
var path = require('path');
var userquery = require('../library/userquery.js');
var commonFunction = require('../library/commonfunction.js');
var stoppage_categories = require('../models/Stoppage_categories.js');
var stoppage_subcategories = require('../models/Stoppage_subcategories.js');
var stoppage_reasons = require('../models/Stoppage_reasons.js');


module.exports.getCategoriesData = function (req, res, next) {

    userquery.simpleselect(stoppage_categories, `*`, null).then(result => {
        let response = {
            success: true,
            statusCode: 200,
            message: 'get categories data',
            data: result
        };
        // console.log("successfully getting categories data", result);
        var catArr = [];
        for(let i=0; i<result.length; i++) {
            let obj = {
                cat_id: result[i].cat_id,
                category_name: result[i].category_name,
                status: result[i].status,
                createdAt: dateFormat(result[i].createdAt, 'default')
            }
            catArr.push(obj);
        }
        res.render(path.join('categories/category-details'), {catArr});
    }).catch(err => {
        let response = {
            success: false,
            statusCode: 500,
            message: 'unable to get categories data',
            data: err
        };
        console.log("error while getting categories data", response.data);
        res.render(path.join('categories/category-details'));
    })
}


module.exports.getSubcategoriesData = function (req, res, next) {

    console.log("request body=====>", req.body);

    let wherecond = `cat_id=${req.body.cat_id}`;
    
    userquery.simpleselect(stoppage_subcategories, `*`, wherecond).then(result => {
        let response = {
            success: true,
            statusCode: 200,
            message: 'get subcategories data',
            data: result
        };
        var subcatArr = [];
        for(let i=0; i<result.length; i++) {
            let obj = {
                subcat_id: result[i].subcat_id,
                cat_id: result[i].cat_id,
                subcategory_name: result[i].subcategory_name,
                status: result[i].status,
                createdAt: dateFormat(result[i].createdAt, 'default')
            }
            subcatArr.push(obj);
        }
        console.log("successfully getting subcategories data", subcatArr);
        res.json({
            data: subcatArr
        })
    }).catch(err => {
        let response = {
            success: false,
            statusCode: 500,
            message: 'unable to get subcategories data',
            data: err
        };
        console.log("error while getting subcategories data", response.data);
        res.render(path.join('categories/category-details'));
    })
}


module.exports.getReasonsData = function (req, res, next) {

    console.log("request body=====>", req.body);

    let wherecond = `subcat_id=${req.body.subcat_id}`;
    
    userquery.simpleselect(stoppage_reasons, `*`, wherecond).then(result => {
        let response = {
            success: true,
            statusCode: 200,
            message: 'get reasons data',
            data: result
        };
        var reasonsArr = [];
        for(let i=0; i<result.length; i++) {
            let obj = {
                reason_id: result[i].reason_id,
                subcat_id: result[i].subcat_id,
                reason_name: result[i].reason_name,
                status: result[i].status,
                createdAt: dateFormat(result[i].createdAt, 'default')
            }
            reasonsArr.push(obj);
        }
        console.log("successfully getting reasons data", reasonsArr);
        res.json({
            data: reasonsArr
        })
    }).catch(err => {
        let response = {
            success: false,
            statusCode: 500,
            message: 'unable to get reasons data',
            data: err
        };
        console.log("error while getting reasons data", response.data);
        res.render(path.join('categories/category-details'));
    })
}