const mongoose = require("mongoose");
const articleDBMongo=require("../models/MongoDB/articles.js");
const {generateArticlesHtml}= require("../Functions/html.js");
const {validations}= require("../Functions/validationsArticles.js")

async function getAllArticles(req, res) {
    try{
        const articlesCollection= await articleDBMongo.find();
        if (articlesCollection.length > 0) {
          const articlesHtml= generateArticlesHtml(articlesCollection);      
            res.writeHead(200, {"Content-Type": "text/html"});
            res.end(`
                <html>
                    <head>
                        <title>Compu-Gamer</title>
                    </head>
                    <body>
                        <h1 style="text-align:center">Compu-Gamer</h1>
                        <h3 style="text-align:center">Home</h3>
                        ${articlesHtml}
                    </body>
                </html>
            `);
        } else {
            res.writeHead(404, {"Content-Type": "text/html"});
            res.end(`
                <html>
                    <head>
                        <title>Compu-Gamer</title>
                    </head>
                    <body>
                        <h1>Compu-Gamer</h1>
                        <h3>Home</h3>
                        <p>No articles available</p>
                    </body>
                </html>
            `);
        }
}catch(error){
    throw new Error("Error retrieving articles");
}};
async function articleForId(req, res) {
    try {
      const articleId = req.params.articleId;
      if(!mongoose.Types.ObjectId.isValid(articleId)){
        return res.status(400).json({ success: false, message: "Invalid ID format" });
      }
      const findArticle = await articleDBMongo.findById(articleId);
      
      if (findArticle) {
        return res.status(200).json({ success: true, message: "Found Article", data: findArticle });
      } else {
        return res.status(404).json({ success: false, message: "Article not found" });
      }
    } catch (error) {
      return res.status(500).json({ success: false, message: "Error searching for Article", error: error.message });
    }
};
async function articleForTitle(req, res) {
  try {
    const {title}  = req.query;
    if(!title){
      return res.status(400).json({ success: false, message: "Missing title query params" });
    }
    const findArticle = await articleDBMongo.find({title: {$regex: title, $options:"i"}});
    
    if (findArticle.length!=0) {
      return res.status(200).json({ success: true, message: "Found Article", data: findArticle });
    } else {
      return res.status(404).json({ success: false, message: "Article not found" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error searching for Article", error: error.message });
  }
};
async function updateForId(req, res) {
    try {
      const isValidOperation=validations(req,res)

      if(!isValidOperation){
        return res.status(400).json({ success: false, message: "Invalid fields" });
      }
      const articleId = req.params.articleId;
      const updateArticle = await articleDBMongo.findByIdAndUpdate(articleId,req.body,{new: true});

      if (updateArticle) {
        return res.status(200).json({ success: true, message: "Article found and updated", data: updateArticle });
      } else {
        return res.status(404).json({ success: false, message: "Article not found" });
      }
    } catch (error) {
      return res.status(500).json({ success: false, message: "Error when updated the Article", error: error.message });
    }
};
function createArticle(req, res) {
  const isValidOperation=validations(req,res)

  if(!isValidOperation){
    return res.status(400).json({ success: false, message: "Invalid fields" });
  }
    try {
      const newArticle = new articleDBMongo(req.body);
      newArticle.save();
      return res.status(200).json({ success: true, message: "The Article was created correctly", data: newArticle });
    } catch (error) {
      return res.status(500).json({ success: false, message: "Error creating Article", error: error.message });
    }
};
async function deleteForId(req, res) {
    try {
      const articleId = req.params.articleId;
      const deletedArticle = await articleDBMongo.findByIdAndDelete(articleId);
      
      if (deletedArticle) {
        return res.status(200).json({ success: true, message: "Articles found and deleted", data: deletedArticle });
      } else {
        return res.status(404).json({ success: false, message: "Articles not found" });
      }
    } catch (error) {
      return res.status(500).json({ success: false, message: "Error when deleting the Articles", error: error.message });
    }
};

module.exports = { getAllArticles, createArticle, articleForTitle, articleForId, updateForId, deleteForId };
