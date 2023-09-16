const User = require("../model/membersmodel")
const AppError = require("../utils/AppError")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs");

const signToken = (id) =>
    jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);

    const cookieOption = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: false,
    };
    user.password = undefined;

    if (process.env.NODE_ENV === "PRODUCTION") cookieOption.secure = true;
    res.cookie("jwt", token, cookieOption);
    res.redirect("/admin/home");
};

exports.signUp = async (req, res, next) => {
    console.log(req.body.name);
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
    });
    createSendToken(newUser, 200, res);
};



checkpass = async function (pass1, pass2) {
    return await bcrypt.compare(pass1, pass2)
};


exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    //1) Check if email and password exists

    if (!email || !password) {
        return next(new AppError("Please provide email and password", 400));
    }
    //2) Check if user exists && password is correct
    const user = await User.findOne({ email }).select("+password");
    // const correct = await user.correctPassword(password, user.password);

    if (!user || !(async function (pass1, pass2) {
        return await bcrypt.compare(passsword, User.password)
    })) {
        return next(new AppError("Incorrect email  or Password", 401));
    }
    //3) if everything ok, send token to clint
    createSendToken(user, 201, res);
};


exports.protect = async (req, res, next) => {
    token = ""

    console.log(req.cookies)
    if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }

    if (!token) {
        return res.redirect("/admin/login")
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET)

    const newuser = await User.findById(decoded.id)

    if (!newuser) {
        return next(new AppError("user no longer exist", 401))
    }

    req.user = newuser
    next()

}