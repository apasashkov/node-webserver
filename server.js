const express=require('express');
const hbs=require('hbs');
const fs=require('fs');

var app=express();

hbs.registerPartials(__dirname+'/views/partials')
app.set('view engine','hbs');
app.use(express.static(__dirname+'/public'));
app.use((req,res,next)=>{
  var now=new Date().toString();
  var log= `${now}:${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log+'\n',err=>{
    if(err){
      console.log('Unable to append server.log');
    }
  });

  next();
});

app.use((req,res,next)=>{
  res.render('maintanance.hbs',{
    pageTitle:"Maintanance",
    welcomeMessage:"Sorry The site will be back soon"
  })
})
hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt',text=>text.toUpperCase());

app.get('/',(req,res)=>{
  //res.send('<h1>Hello there</h1>');
  //res.send({
    //name:'Anton',
    //likes:[
      //'dogs','biking','cats'
    //]
  //})

  res.render('home.hbs',{
    pageTitle:'Home page',
    welcomeMessage:'WELCOME TO MY CIRCUS'
  })
});

app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pageTitle:'About page'
  });
})

app.get('/bad',(req,res)=>{
  res.send({
    error:'Unable to fulfill the request'
  })
})

app.listen(3000,()=>{
  console.log('listening on 3000');
});
