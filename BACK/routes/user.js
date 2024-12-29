import express from 'express';  
import bcrypt from 'bcrypt';
import User from '../models/user.js';

let router = express.Router();
router.put('/:id', async(req,res)=>{
    if(req.body.userId === req.params.id || req.body.Admin){
        if(req.body.password){
            try{
                let salt = await bcrypt.genSalt(10)
                req.body.password = await bcrypt.hash(req.body.password, salt)
            }catch(err){
                return res.status(400).json(err)
            }
        }
        try{
            let user = await User.findByIdAndUpdate(req.params.id, {$set:req.body})
            res.status(200).json('Account has been updated')
        }catch(err){
            return res.status(400).json(err)
        }
    }else{
        return res.status(403).json('You can only update your account')
    }
})

router.delete('/:id', async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            await User.findByIdAndDelete(req.params.id);
            
            res.status(200).json({ message: 'Account has been deleted' });
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    } else {
        return res.status(403).json({ message: 'You can only delete your account' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        let user = await User.findById(req.params.id);
        let { password, updatedAt, ...other } = user._doc;
        res.status(200).json(other);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});

router.get('/', async (req, res) => {
    let userId = req.query.userId;
    let username = req.query.username;
    try {
        let user = userId? await User.findById(userId): await User.findOne({ username: username });
        let { password, updatedAt, ...other } = user._doc;
        res.status(200).json(other);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});

router.put('/:id/follow', async (req, res) => {
    if (req.body.userId === req.params.id) {
        return res.status(403).json({ message: "You can't follow yourself" });
    }
    try {
        let user = await User.findById(req.params.id);
        let currentUser = await User.findById(req.body.userId);
        if (!user.followers.includes(req.body.userId)) {
            await user.updateOne({ $push: { followers: req.body.userId } });
            await currentUser.updateOne({ $push: { following: req.params.id } });
            res.status(200).json({ message: 'User has been followed' });
        } else {
            res.status(400).json({ message: 'You already follow this user' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/:id/unfollow', async (req, res) => {
    if (req.body.userId === req.params.id) {
        return res.status(403).json({ message: "You can't unfollow yourself" });
    }

    try {
        const user = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);
        if (user.followers.includes(req.body.userId)) {
            await user.updateOne({ $pull: { followers: req.body.userId } });
            await currentUser.updateOne({ $pull: { following: req.params.id } });

            return res.status(200).json({ message: "User has been unfollowed" });
        } else {
            return res.status(400).json({ message: "You are not following this user" });
        }
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});


export default router;