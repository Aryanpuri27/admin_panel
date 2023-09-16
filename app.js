const express = require("express")
const cookieparser = require("cookie-parser")
const userroute = require("./route/userroute")
const adminroute = require("./route/adminroute")

const app = express()

app.use(express.static(__dirname + "/static"))
app.use(cookieparser())
app.set("view engine", "ejs")
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/user", userroute)
app.use("/admin", adminroute)

module.exports = app