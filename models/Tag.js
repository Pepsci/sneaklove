const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Tag = new Schema ({
    label: String,
})

const tagModel = mongoose.model("tag", Tag);

module.exports = tagModel