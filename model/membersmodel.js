const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs");

const schema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "please tell us your name"]
    },
    email: {
        type: String,
        require: [true, "you must provide email"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "provide valid email"]
    },
    password: {
        type: String,
        require: [true, "please enter password"]
    },
    passwordConfirm: {
        type: String,
        require: [true, 'please provide password'],
        validate: {
            validator: function (el) {
                return el === this.password
            },
            message: "password and confirm password should be same"
        }

    },
    role: {
        type: String,
        enum: ["member", "admin", "writer", "editor"]
    }
})

schema.pre("save", async function (next) {
    if (!this.isModified("password")) return next()

    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    next();
})





const membermodel = mongoose.model("members", schema)

module.exports = membermodel