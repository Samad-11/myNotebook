const mongoose = require("mongoose");
const { Schema } = mongoose;

const noteSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'user'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    tags: {
        type: String,
        default: "General"
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("note", noteSchema);
