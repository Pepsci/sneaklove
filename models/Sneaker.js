const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Sneaker = new Schema({
    name :  String,
    ref : String,
    size : Number,
    description : String,
    price : Number,
    image: String,
    category : {
        type :String,
        enum: ['men', 'women', 'kids']},
        id_tags: { type: Schema.Types.ObjectId, ref: "tags" }
})

const sneakerModel = mongoose.model("sneaker", Sneaker);
module.exports = sneakerModel
