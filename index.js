const { constants } = require('buffer');
const express=require('express');
const path=require('path');
const port=8000;

const db=require('./config/mongoose');
const Contact=require('./models/contact');
const app=express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));
// const contactList=[
//     {
//         name:'Qwerty',
//         phone:12833003
//     },
//     {
//         name:'werty',
//         phone:17293920
//     },
//     {
//         name:'erty',
//         phone:17289020
//     }
// ]


app.get('/',function(req,res){

    Contact.find().then(function(contacts){
        return res.render('home',{
            title:"contact list",
            contacts:contacts
});
    });
       
    });
    // return res.render('home',{
    //     title:"contact list",
    //      contacts:contactList
    // });
    

app.post('/create-contact',function(req,res){
    Contact.create(req.body);
    return res.redirect('back');
    
});

app.get('/delete-contact',function(req,res){
    // console.log(req.query);
    let id=req.query.id;
    console.log(id);
    Contact.findByIdAndDelete(id).then(function(err){
        if(err){
            console.log(err);
        }
        res.redirect('back');
    });
   
});

app.listen(port,function(err){
    if(err){
        console.log(err);
        return;
    }
    console.log("Running at",port);
});