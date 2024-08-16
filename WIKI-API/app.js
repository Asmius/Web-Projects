//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser: true});
const ArticleSchema={
  title:String,
  content:String
}

const article = mongoose.model("articles",ArticleSchema);

///////////////////////////////Requests Targetting all the articles//////////////////////////////////
app.route("/articles")

.get(function(req,res){
  article.find(function(err,foundItems){
    if(err){
         res.send(err);
    }
    else{
        res.send(foundItems);
    }
  })
})

.post(function(req,res){

const newArticle = new article({
  title: req.body.title,
  content: req.body.content
});

  newArticle.save(function(err){
    if(err){
      res.send(err);
    }
    else{
      res.send("Successfully added the new article")
    }
  });
})

.delete(function(req,res){
  article.deleteMany(function(err){
    if(err){
      res.send(err);
    }else{
      res.send("Successfully deleted the article");
    }
  })
});

/////////////////////////Requests Targetting a Specific article/////////////////////////////////////////////

app.route("/articles/:ArticleTitle")
.get(function(req,res){
  article.findOne({title:req.params.ArticleTitle},function(err,foundArticle){

      if(foundArticle){
        res.send(foundArticle);
      }
      else{
        res.send("No articles matching the title was found");
      }

  })
})

.put(function(req,res){
  article.update(
    {title:req.params.ArticleTitle},
    {title:req.body.title,content:req.body.content},
    {multi: true },
    function(err){
      if(!err){
        res.send("Successfully Updated the article");
      }
      else{
        console.log(err);
      }
    }
  )
})

.patch(function(req,res){
  article.update(
    {title:req.params.ArticleTitle},
    {$set:req.body},
    function(err){
      if(!err){
        res.send("Successfully updated the article");
      }
      else{
        console.log(err);
      }
    }
)
})

.delete(function(req,res){
  article.deleteOne(
    {title:req.params.ArticleTitle},
    function(err){
      if(!err){
        res.send("Successfully deleted the specified Article");
      }else{
        console.log(err);
      }
    }
  )
});




app.listen(3000, function() {
  console.log("Server started on port 3000");
});
