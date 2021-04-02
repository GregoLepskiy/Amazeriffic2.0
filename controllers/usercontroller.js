var User = require("../models/user.js"),
    mongoose = require("mongoose"),
    UsersController = {};
User.find({}, function (err, result) {
    if (err !== null) {
        console.log("Something wrong");
        console.log(err);
    } else if (result.length === 0) {
        console.log("New user' creation...");
        var exampleUser = new User ({"username":"usertest"});
        exampleUser.save(function (err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log("Test user saved");
            }
        });
    }
});
UsersController.index = function (req, res) {
    console.log("called action: index");
    res.send(200);
};
UsersController.show = function (req, res) {
    console.log("called action: show");
    res.send(200);
};
UsersController.create = function (req, res) {
    console.log("called action: create");
    res.send(200);
};
UsersController.update = function (req, res) {
    console.log("called action: update");
    res.send(200);
};
UsersController.destroy = function (req,res) {
    console.log("called action: destroy");
    res.send(200);
};
module.exports = UsersController;