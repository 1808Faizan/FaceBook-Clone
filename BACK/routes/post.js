import express from 'express';
import Post from '../models/post.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
let router = express.Router();

let _filename = fileURLToPath(import.meta.url)
let _dirname = path.dirname(_filename)

let uploadDir = path.join(_dirname,'public', 'images')
if(!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir,{ recursive:true});
}

let storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, 'public/images/post');
    },
    filename:(req, file, cb)=>{
        cb(null, file.filename + '-' + Date.now() + path.extname(file.originalname));
    }
})
let upload = multer({storage})
router.get('/', async (req, res) => {
    console.log('hey i am route');
})

router.post('/', upload.single('img'),async (req, res) => {
    if(!req.file){
        return res.status(400).send('No image uploaded');
    }
    let photopath = req.file.path;
    let newPost = new Post({
        userId: req.body.userId,
        desc: req.body.desc,
        likes:[],
        img: photopath,
    })
    try{
        let savePost = await newPost.save();
        res.status(201).send(savePost);
    }catch(err){
        res.status(400).send(err);
    }
})

router.put('/:id', async(req, res) => {
    try{
        let post =  await Post.findById(req.params.id);
        if(post.userId === req.body.userId){
            await post.updateOne({$set: req.body})
            res.status(200).json('Post has been updated successfully')
        }
        else{
            res.status(403).send('Not authorized to update this post');
        }
    }catch(err){
        res.status(400).send(err);
    }
})

router.delete('/:id', async(req, res) => {
    try{
        let post =  await Post.findById(req.params.id);
        if(post.userId === req.body.userId){
            await post.deleteOne()
            res.status(200).json('Post has been deleted successfully')
        }
        else{
            res.status(403).send('Not authorized to delete this post');
        }
    }catch(err){
        res.status(400).send(err);
    }
})

router.put('/:id/like',async(req, res)=>{
    try{
        let post = await Post.findById(req.params.id)
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push:{likes:req.body.userId}})
            res.status(200).json("Post has been Liked")
        }else{
            await post.updateOne({$pull:{likes:req.body.userId}})
            res.status(200).json("Post has been Unliked")
        }
    }catch(err){
        res.status(400).send(err)
    }
})

router.get('/:id',async(req, res)=>{
    try{
        let post = await Post.findById(req.params.id)
        res.status(200).json(post)
    }catch(err){
        res.status(400).send(err)
    }
})

router.get('/timeline/:userId',async(req, res)=>{
    try{
        let current =  await User.findById(req.params.userId);
        let userPosts = await Post.find({userId: current._id})
        let friendPosts = await Promise.all(current.followings.map((friendId)=>{
            return Post.find({userId: friendId})
        }))
    res.status(200).json(userPosts.concat(...friendPosts))
    }catch(err){
        res.status(400).send(err)
    }
})

router.get('profile/:username', async(req, res) =>{
    try{
        let user = await User.findOne({username: req.params.username})
        if(!user){
            return res.status(404).send('User not found')
        }
        let userPosts = await Post.find({userId: user._id})
        res.status(200).json(userPosts)
    }catch (err){
        res.status(400).json(err)
    }
})
export default router;