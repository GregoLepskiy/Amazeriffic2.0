var express = require("express"),
    http = require("http"),
    mongoose = require("mongoose"),
    usersController = require("./controllers/usercontroller.js"),
    toDosController = require("./controllers/todoscontroller.js"),
    app = express();

http.createServer(app).listen(3000);
app.use(express.static(__dirname + "/client"));
app.use('/', express.static(__dirname + "/client"));
app.use('/user/:username', express.static(__dirname + "/client"));
app.use(express.urlencoded({extended: true}));
mongoose.connect('mongodb://localhost/amazeriffic2', {
    useNewUrlParser : true,
    useCreateIndex : true,
    useUnifiedTopology : true
}).then(res => {
    console.log("DB is connected");
}).catch(err => {
    console.log(Error, err.message);
});

app.get("/users.json", usersController.index);
app.post("/users", usersController.create);
app.get("/users/:username", usersController.show);
app.put("/users/:username", usersController.update);
app.delete("/users/:username", usersController.destroy);

app.get("/user/:_id/todos.json", toDosController.index);
app.post("/user/:_id/todos", toDosController.create);
app.put("/user/:_id/todos/:id", toDosController.update);
app.delete("/user/:_id/todos/:id", toDosController.destroy);

app.get("/todos.json", toDosController.index);
app.get("/todos/:id", toDosController.show); 
app.post("/todos", toDosController.create);
app.put("/todos/:id", toDosController.update);
app.delete("/todos/:id", toDosController.destroy);