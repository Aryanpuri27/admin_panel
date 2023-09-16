exports.getnews = (req,res,next)=>{
    res.status(200).send({
        'list':"some list"
    })
}
exports.getevent = (req,res,next)=>{
    res.status(200).send({
        'events':'some event'
    })
}

exports.geteventlist= (req,res,next)=>{
    res.status(200).send({
        "eventlist":"some list"
    })
}

exports.getnewslist = (req,res,next)=>{
    res.status(200).send({
        "newslist":"some list"
    })
}