const mongoose = require('mongoose');

const Tweet = new mongoose.Schema({
    username : {
        type : String,
        unique : true
    },
    name : {
        type : String,
    },
    password : {
        type : String
    },
    email : {
        type : String,
        unique : true
    },
    image : {
        type : String
    },
    followers : [
        {type : String}
    ],
    following : [
        {type : String}
    ],
    noFollowers : {
        type : Number,
        default : 0
    },
    noFollowing : {
        type : Number,
        default : 0
    },
    tweet : [
        {type : String}
    ]
})



module.exports = mongoose.model('Tweet',Tweet);
// module.exports = mongoose.model('Like',Like);