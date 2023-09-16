const app = require("./app")
const dotenv = require("dotenv")
const mongoose = require("mongoose")

dotenv.config({path: `${__dirname}/config.env`})
const DB = process.env.DATABASE.replace(
    "<PASSWORD>",
    process.env.DATABASE_PASSWORD
)
mongoose.connect(DB,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
}).then(
    console.log("Database connection sucessfull 👍")
)

app.listen(process.env.PORT, ()=>{
    console.log(`server listerning on port: ${process.env.PORT}`)
})