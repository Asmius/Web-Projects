const express = require("express");
const bodyParser=require("body-parser");

let items=["Do the work"," take rest", "watch movies", "continue"];
let workItems=[];

const app = express();
app.set("view engine","ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req,res){
  var today= new Date();
  var options={
    weekday: "long",
    day:"numeric",
    month:"long"
  };

  let day = today.toLocaleDateString("en-US",options);

  res.render("list",{ListTitle:day, newlistitems:items});
});

app.get("/work",function(req,res){
  res.render("list",{ListTitle:"Work List", newlistitems:workItems});
});

app.get("/about",function(req,res){
  res.render("about");
});


app.post("/work",function(req,res){
  let item=req.body.newitem;
  workItems.push(item);
  res.redirect("/work");
});

app.post("/",function(req,res){

  let item =req.body.newitem;


if(req.body.list === "Work"){
  workItems.push(item)
  res.redirect("/work");
}else {
  items.push(item);
  res.redirect("/");
}

});

app.listen(3000,function(){
  console.log("The server is started at port 3000");
})
