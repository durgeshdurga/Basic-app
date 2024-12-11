const express= require('express');
const app = express();
const path= require('path');
const fs= require('fs');
const { log } = require('console');

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));

app.get('/',(req,res)=>{
    // fs.readdir() method file read krega AUR uska structure me ("fiel ka path", ek function(err,files)[files folder hai aur uska name  files hai])
    fs.readdir('./files',function(err,files){
        res.render("main", {files: files});
        // log(files);
    })
})

app.get('/file/:fileName',(req,res)=>{
    fs.readFile(`./files/${req.params.fileName}`,"utf-8",function(err,fileData){
        res.render("show", {fileName: req.params.fileName, fileData: fileData})
    })
})

app.post('/create',(req,res)=>{
    // fs.writeFile() yeh sb padhane ke liye documentation padhana hai
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.details,function(err){
        res.redirect('/')
    });
})


app.listen(3000,()=>{
    console.log("Server started..");
})
