const express = require("express")
const usercontroller = require("../controller/usercontroller")

const Router = express.Router()

Router.route("/news").get(usercontroller.getnews)
Router.route("/event").get(usercontroller.getevent)
Router.route("/newslist").get(usercontroller.getnewslist)
Router.route("/eventlist").get(usercontroller.geteventlist)

module.exports = Router