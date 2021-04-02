var express = require("express"),
    http = require("http"),
    mongoose = require("mongoose"),
    usersController = require("./controllers/usercontroller.js"),
    toDosController = require("./controllers/todoscontroller.js"),
    app = express();
app.use(express.static(__dirname + "/client"));
app.use('/', express.static(__dirname + "/client"));
app.use('/user/:username', express.static(__dirname + "/client"));
app.use(express.urlencoded({extended: true}));
mongoose.connect('mongodb://localhost/amazeriffic2');
http.createServer(app).listen(3000);
app.get("/users.json", usersController.index);
app.get("/users", usersController.create);
app.get("/users/:username", usersController.show);
app.get("/users/:username", usersController.update);
app.get("/users/:username", usersController.destroy);
app.get("/user/:username/todos.json", toDosController.index);
app.post("/user/:username/todos", toDosController.create);
app.put("/user/:username/todos/:id", toDosController.update);
app.delete("/user/:username/todos/:id", toDosController.destroy);
app.post("/todos", function(req, res){
    console.log(req.body);
    var newToDo = new ToDo({"description" : req.body.description,
                            "tags" : req.body.tags});
    newToDo.save(function (err, result) {
        if (err !== null) {
            console.log(err);
            res.send("ERROR");
        } else {
            ToDo.find({}, function (err, result) {
                if (err !== null) {
                    res.send("ERROR");
                }
                res.json(result);
            });
        }
    });
});