import express from 'express';  
import multer from 'multer';
import bcrypt from 'bcrypt';
import path from 'path';
import User from '../models/user.js';

let router = express.Router();

let storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, 'public/images/person');
    },
    filename:(req, file, cb)=>{
        cb(null, file.filename + '-' + Date.now() + path.extname(file.originalname));
    }
})
let upload = multer({storage})

router.post('/register', upload.fields([{name:'profilePicture', maxCount:1},{name:'coverPicture', maxCount:1}]), async (req, res) => {
    try{
        let salt = await bcrypt.genSalt(10)
        let hashedPassword = await bcrypt.hash(req.body.password, salt)

        let user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            profilePicture: req.files.profilePicture ? req.files.profilePicture[0].path:null,
            coverPicture: req.files.coverPicture ? req.files.coverPicture[0].path:null,
            desc:req.body.desc,
            city:req.body.city,
            from:req.body.from,
            relationship:req.body.relationship,
        })
        let newUser = await user.save()
        res.status(201).json({message:'User registered successfully', user:newUser})
    }catch(err){
        res.status(500).json(err);
    }
})

router.post('/login', async (req, res) => {
    try{
        let {email, password} = req.body 
        let user =  await User.findOne({ email: email})
        if(!user){
            return res.status(400).json({message:'User not found'})
        }
        let validPassword = await bcrypt.compare(password, user.password)
        if(!validPassword){
            return res.status(400).json({message:'Wrong password'})
        }
        let{password:_, ...userWithoutPassword} = user.toObject();
        res.status(200).json(userWithoutPassword)
    }catch(err){
        res.status(500).json(err)
    }
})

export default router;