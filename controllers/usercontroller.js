var User = require("../models/user.js"),
    ToDo = require("../models/todos.js"),
    UsersController = {},
    mongoose = require("mongoose");
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
    User.find(function (err, users) {
        if (err !== null) {
            res.status(500).json(err);
        } else {
            res.status(200).json(users);
        }
    });
};
UsersController.show = function (req, res) {
    console.log("called action: show");
    User.find({"username" : req.params.username}, function (err, users) {
        if (err !== null) {
            res.status(500).json(err);
        } else {
            if (users.length !== 0) {
                res.sendfile('../client/list.html');
            } else {
                res.status(404).json("Not Found");
            }
        }
    });
};
UsersController.create = function (req, res) {
    console.log("called action: create");
    var username = req.body.username;
    User.find({"username" : username}, function (err, result){
        if (err) {
            res.status(500).json(err);
        } else if (result.length !== 0) {
            res.status(501).send("User is already consist");
        } else {
            var newUser = new User({
                "username" : username
            });
            newUser.save(function(err, result){
                console.log(err);
                if (err !== null) {
                    res.status(500).json(err);
                } else {
                    res.status(200).json(result);
                }
            });
        }
    });
};
UsersController.update = function (req, res) {
    console.log("called action: update");
    var username = req.params.username;
    console.log("Old user's name: " + username);
    var newUsername = {$set : {username : req.body.username}};
    console.log("New user's name: " + req.body.username);
    User.updateOne({"username" : username}, newUsername, function (err, user){
        if (err !== null) {
            res.status(500).json(err);
        } else {
            if (user.n === 1 && user.nModified === 1 && user.ok === 1){
                console.log('Changed');
                res.status(200).json(user);
            } else {
                res.status(404).json("Not Found");
            }
        }
    });
};
UsersController.destroy = function (req,res) {
    console.log("called action: destroy");
    var username = req.params.username;
    User.find({"username" : username}, function (err, result){
        if (err) {
            res.status(500).json(err);
        } else if (result.length !== 0){
            console.log("Delete all todo with 'owner' : " + result[0]._id);
            ToDo.deleteMany({"owner" : result[0]._id}, function(err, todo){
                console.log("Deleting user...");
                User.deleteOne({"username" : username}, function (err, user){
                    if (err !== null){
                        res.status(500).json(err);
                    } else {
                        if (user.n === 1 && user.ok === 1 && user.deletedCount === 1){
                            res.status(200).json(user);
                        } else {
                            res.status(404).json({"status" : 404});
                        }
                    }
                });
            });
        } else {
            res.status(404).send("Not Found");
        }
    });
};
module.exports = UsersController;