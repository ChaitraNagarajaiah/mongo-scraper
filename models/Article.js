var mongoose = require("mongoose");

//Save a reference to the schema constructor
var Schema = mongoose.Schema;

//using the Schema constructor, create a new Schema object
var ArticleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    comment: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }]
});
//This creates our model from the above schema, using mongoose's model method
var Article = mongoose.model("Article", ArticleSchema);

//export the article model
module.exports = Article;