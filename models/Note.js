var mongoose = require("mongoose");

//save a reference to the schema constructor
var Schema = mongoose.Schema;

//using the Schema constructor, create a new NoteSchema object
var NoteSchema = new Schema({
    title: String,
    body: String
});

//this cretes our model from the above schema, using mongoose's model method
var Note = mongoose.model("Note", NoteSchema);

//Export the Note model
module.exports = Note;