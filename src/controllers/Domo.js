var _ = require('underscore');
var models = require('../models');

var Domo = models.Domo;

var makerPage = function(req, res){

    Domo.DomoModel.findByOwner(req.session.account._id, function(err, docs) {
        if (err) {
            console.log(err);
            return res.status(400).json({error: "An error occurred"});
        }

        res.render('app', {csrfToken: req.csrfToken()});
    });
};

var displayPage = function(req, res){

    Domo.DomoModel.findByOwner(req.session.account._id, function(err, docs) {
        if (err) {
            console.log(err);
            return res.status(400).json({error: "An error occurred"});
        }

        res.render('display', {csrfToken: req.csrfToken(), domos: docs});
    });
};

var makeDomo = function(req, res){

    if(!req.body.name || !req.body.age || !req.body.power) {
        return res.status(400).json({error: "RAWR! All fields are required"});
    }

    var domoData = {
        name: req.body.name,
        age: req.body.age,
        power: req.body.power,
        owner: req.session.account._id
    };

    var newDomo = new Domo.DomoModel(domoData);

    newDomo.save(function(err) {
        if (err) {
            console.log(err);
            return res.status(400).json({error: "An error occurred"});
        }

        res.json({redirect: '/display'});
    });

};

//var removeDomo = function(req, res){
//    
//};

module.exports.makerPage = makerPage;
module.exports.make = makeDomo;
module.exports.displayPage = displayPage;