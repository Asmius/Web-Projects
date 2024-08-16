const express = require("express");
const app = express();

app.get("/about",function(req,res)
{
  res.send("Suresh");
});
app.get("/hobbies",function(req,res){
  res.send("<ul><li>Games</li><li>Movies</li>")
});
app.listen(3000,function(){
  console.log("Server started on port 3000");
});
