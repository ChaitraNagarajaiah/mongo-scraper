var mongoose = require("mongoose");

//save a reference to the schema constructor
var Schema = mongoose.Schema;

//using the Schema constructor, create a new CommentSchema object
var CommentSchema = new Schema({
    name: {
        type: String
    },

    body: {
        type: String,
        required: true
    }
});

//this cretes our model from the above schema, using mongoose's model method
var Comment = mongoose.model("Comment", CommentSchema);

//Export the Note model
module.exports = Comment;