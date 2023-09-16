const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    imgurl: {
        type: String
    },
    heading: {
        type: String
    },
    para: {
        type: String
    },
    image: {
        type: Buffer,
        contentType: String,
    }
})

const eventmodel = mongoose.model("events", schema)

module.exports = eventmodel