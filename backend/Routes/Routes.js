const express = require('express');
const router = express.Router();
const Tweet = require('../Model/Model.js');

router.post('/tweet',async (req,res)=>{
    const searchResult = await Tweet.findOne({ username : req.body.username })
    const folowingList = searchResult.following;
    
    let sendJson = []

    for(let person of folowingList){
        let searchPerson = await Tweet.findOne({ username : person })
        let searchPersonName = searchPerson.name;
        let searchPersonUsername = searchPerson.username;
        let searchPersonTweet = searchPerson.tweet;
        let searchPersonPic = searchPerson.image;
        let personResponse = {
            name : searchPersonName,
            username : searchPersonUsername,
            image : searchPersonPic,
            tweet : searchPersonTweet
        }
        sendJson.push(personResponse);
    }
    res.json(sendJson);
})

router.get('/tweet/:username',async(req,res) =>{
    const username = req.params.username
    await Tweet.findOne({username}).then((data)=>{
        res.json(data.tweet);
    }).catch((e)=>{
        console.log(e);
    })
})

router.post('/signup',async (req,res) =>{
    console.log(req.body.name);
    
    const newTweet = new Tweet({
        username : req.body.username,
        name : req.body.name,
        password : req.body.password,
        image : req.body.image,
        email : req.body.email, 
    })

    try {
        const ew = await newTweet.save();
        res.json('ok')
    } catch (error) {
        res.json('duplicate');
    }
});

router.post('/login', async(req,res)=>{
    const RequestPassword = req.body.password;
    try {
        const i = await Tweet.findOne({username : req.body.username});
        if(i.password === RequestPassword){
            res.json({
                username : i.username,
                name : i.name,
                email : i.email,
                image : i.image
            });
        }else{
            res.send('not a match')
        }
    } catch (error) {
        console.log('error in login');
        res.send('user doesnt exist')
    }
})

router.put('/tweet', async (req,res) =>{
    try {
        await Tweet.findOneAndUpdate({
            username : req.body.username,
        },
        {
            $push : {
                tweet : req.body.tweet
            }
        })
        res.send('ok')
    } catch (error) {
        res.send('error in /put')
    }
})

router.post('/search', async(req,res)=> {
    let sName = req.body.search;
    let users = [];
    try {
        let search = await Tweet.find({ name : {$regex : sName,$options : "$i"}});
        for await(const query of search){
            if(query.username === req.body.iUsername){
                //do nothing
            }else{         
                users.push({
                    name : query.name,
                    image : query.image,
                    username : query.username,
                    followers : query.followers,
                    following : query.following
                })
            }
        }
        res.json(users);
    } catch (error) {
        res.send('')
    }
})

router.post('/follow',async(req,res)=>{
    const loggedUsername = req.body.loggedUsername;
    const destinationUsername = req.body.destinationUsername.profile 
    const userSearch = await Tweet.findOne({username : loggedUsername});
    const otherSearch = await Tweet.findOne({username : destinationUsername});
    await Tweet.findOneAndUpdate({
        username : loggedUsername
    },
    {
        $addToSet : {
            following : destinationUsername
        }
    } 
    )
    await Tweet.findOneAndUpdate({
        username : destinationUsername
    },
    {
        $addToSet : {
            followers : loggedUsername
        }
    }
    )
    let responseFinal = {
        loggedUsernameFollowers : userSearch.followers,
        loggedUsernameFollowing : userSearch.following,
        destinationUsernameFollowers : otherSearch.followers,
        destinationUsernameFollowing : otherSearch.following
    }
    res.json(responseFinal)
})

router.post('/profile', async(req,res)=>{
    const profile = await Tweet.findOne({username : req.body.username.profile});
    let profileRes  = {
        name : profile.name,
        username : profile.username,
        email : profile.email,
        tweets : profile.tweet,
        followers : profile.followers,
        following : profile.following,
        pic : profile.image
    } 
    res.json(profileRes)
})

router.post('/loggeduser',async (req,res)=>{
    const myProfile =await Tweet.findOne({ username : req.body.username });
    let myProfileFollowers = myProfile.followers;
    let myProfileFollowing = myProfile.following;
    let FollowersAndImage = []
    let FollowingAndImage = []
    for(let personFollower of myProfileFollowers){
        const searchLoop = await Tweet.findOne({username : personFollower});
        FollowersAndImage.push(
            {
                name : searchLoop.name,
                username : searchLoop.username,
                image : searchLoop.image
            }
        )
    }
    for(let personFollowing of myProfileFollowing){
        const searchLoopFollowing = await Tweet.findOne({username : personFollowing});
        FollowingAndImage.push({
            name : searchLoopFollowing.name,
            username : searchLoopFollowing.username,
            image : searchLoopFollowing.image
        })
    }

    let FinalResponse = [FollowersAndImage,FollowingAndImage];
    res.json(FinalResponse);
})

module.exports = router;