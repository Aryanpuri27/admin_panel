const express = require('express')
const admincontroller = require('../controller/admincontroller')
const logincontroller = require("../controller/logincontroller")
const Router = express.Router()

Router.route("/members").get(logincontroller.protect, admincontroller.getmembers)
Router.route("/home").get(logincontroller.protect, admincontroller.gethome)
Router.route("/postevent").post(logincontroller.protect, admincontroller.isallowed, admincontroller.postevent)
Router.route("/postevent").get(logincontroller.protect, admincontroller.isallowed, admincontroller.posteventpage)
Router.route("/postnews").post(logincontroller.protect, admincontroller.isallowed, admincontroller.postnews)
Router.route("/login").post(logincontroller.login)
Router.route("/signup").post(logincontroller.signUp)
module.exports = Router