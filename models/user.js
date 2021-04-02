var mongoose = require("mongoose"),
    UserSchema = mongoose.Schema({
        username: String,
        id: String
    }),
    User = mongoose.model("User", UserSchema);
module.exports = User;