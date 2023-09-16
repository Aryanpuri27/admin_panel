const events = require("../model/eventmodel")

const AppError = require("../utils/AppError")
exports.getmembers = (req, res, next) => {
    res.status(200).send({
        "members": "list of some members"
    })
}

exports.postevent = async (req, res, next) => {
    const save = await events.create({
        heading: req.body.heading,
        para: req.body.para
    })
    res.status(200).send({
        "status": "sucessfull",
        "saved": save
    })
}
exports.postnews = (req, res, next) => {
    res.status(200).send({
        "status": "sucessfull"
    })
}

exports.gethome = (req, res, next) => {
    res.status(200).render("home")
}


exports.isallowed = (req, res, next) => {
    if (req.user.role == "admin" || req.user.role == "writer") {
        return next()
    }
    else {
        return next(new AppError("you are not allowed to use this", 405))
    }
}

exports.posteventpage = (req, res, next) => {
    res.status(200).render('postevent')
}