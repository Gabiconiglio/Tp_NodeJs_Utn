const articleDBMongo=require("../models/MongoDB/articles.js");
const {generateArticlesHtml}= require("../Functions/html.js");

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
      const findArticle = await articleDBMongo.findById(articleId);
      
      if (findArticle) {
        res.status(200).json({ success: true, message: "Found Article", data: findArticle });
      } else {
        res.status(404).json({ success: false, message: "Article not found" });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: "Error searching for Article", error: error.message });
    }
};
async function updateForId(req, res) {
    try {
      const articleId = req.params.articleId;
      const { title,type,brand,capacity,speed,casLatency,image,price,stock,rating,modular,interface,wattage,efficiency,cores,threads,clockSpeed} = req.body;
      const updateArticle = await articleDBMongo.findByIdAndUpdate(articleId,{ title,type,brand,capacity,speed,casLatency,image,price,stock,rating,modular,interface,wattage,efficiency,cores,threads,clockSpeed},{new: true});

      if (updateArticle) {
        res.status(200).json({ success: true, message: "Article found and updated", data: updateArticle });
      } else {
        res.status(404).json({ success: false, message: "Article not found" });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: "Error when updated the Article", error: error.message });
    }
};
function createArticle(req, res) {
    const { title,type,brand,capacity,speed,casLatency,image,price,stock,rating,modular,interface,wattage,efficiency,cores,threads,clockSpeed } = req.body;
    try {
      const newArticle = new articleDBMongo({ title,type,brand,capacity,speed,casLatency,image,price,stock,rating,modular,interface,wattage,efficiency,cores,threads,clockSpeed });
      newArticle.save();
      res.status(200).json({ success: true, message: "The Article was created correctly", data: newArticle });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error creating Article", error: error.message });
    }
};
async function deleteForId(req, res) {
    try {
      const articleId = req.params.articleId;
      const deletedArticle = await articleDBMongo.findByIdAndDelete(articleId);
      
      if (deletedArticle) {
        res.status(200).json({ success: true, message: "Articles found and deleted", data: deletedArticle });
      } else {
        res.status(404).json({ success: false, message: "Articles not found" });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: "Error when deleting the Articles", error: error.message });
    }
};

module.exports = { getAllArticles, createArticle, articleForId, updateForId, deleteForId };
