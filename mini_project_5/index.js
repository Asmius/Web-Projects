const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const http  = require('http');
const bcrypt = require('bcrypt');
const { Form, User } = require('./config');
const { MongoClient, ObjectId } = require('mongodb');
const multer = require('multer');
const Grid = require('gridfs-stream');



const app = express();
const upload = multer(); 
const server=http.createServer(app);

app.set("view engine","ejs");
app.set("views","./views")
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());





app.get ("/", function(req, res){
    res.render('page/login',{msg:""});
});

app.get("/signup",function(req,res){
    res.render("page/signup",{msg:""});
});

app.get('/home',async function(req,res){
    try {
        const formData = await Form.find();
        res.render("page/home", {formData});
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/forms',function(req,res){
    res.render('page/forms',{msg:''});
});


app.post("/forms",upload.single('image'), async function(req,res){
    const data = {
        title: req.body.title,
        author: req.body.author,
        content: req.body.content,
        property: req.body['intellectual-property'],
        image: req.file.buffer,
    };

    try {
        await Form.insertMany(data);
        const formData = await Form.find();
        console.log(formData);  // Log the data to the console
        res.render("page/home", {formData});
    } catch (error) {
        console.error(error);  // Log any errors
        res.status(500).send("Internal Server Error");
    }
});



app.get('/profile',function(req,res){
    res.render('page/profile',{msg:''});
});

app.get('/verification',function(req,res){
    res.render('page/verification',{msg:''});
});

app.post("/signup",async function(req,res){
    const data={
        username:req.body.username,
        password:req.body.password

    }

    // Check for existing user
    const existingUser = await User.findOne({username:data.username});
    if (existingUser){
        res.send("User already exists. Please choose a different username");
    }else{
        //hashing the password with bcrypt

        const SaltRounds=10;
        const HashedPassword= await bcrypt.hash(data.password,SaltRounds);
        
        data.password = HashedPassword;


        const UserData = await User.insertMany(data);
        console.log(UserData);
        res.render("page/login");
    }

});

app.post("/",async (req, res)=>{
    try{
        const Check=  await User.findOne({username:req.body.username});
        const formData = await Form.find();
        if(!Check){
            res.send("Username Cannot found");
        }
       

        console.log(Check.password + req.body.password);
        const IsPasswordMatch = await bcrypt.compare(req.body.password,Check.password);
        

        if(IsPasswordMatch){
            res.render("page/home", {formData});
        }else{
            res.send("Wrong Password");
    }}catch(error){
        res.send("Wrong Detail");
    }
});




app.listen(3000, () => console.log("Server is running on port 3000"));

