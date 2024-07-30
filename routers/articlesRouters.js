const express=require("express");
const articlesRouters=express.Router();
const articlesController=require("../controllers/articlesControllers.js");
const token= require("../services/jwt.js");
//Todas los Articulos
articlesRouters.get("/all", async (req, res) => {
    try {
      const response = await articlesController.getAllArticles(req, res);
      res.json(response); 
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error retrieving articles",
        error: error.message,
      });
    }
});


//Articulo por Titulo
  articlesRouters.get("/search/title/",articlesController.articleForTitle);
//Articulo por ID
  articlesRouters.get("/search/id/:articleId",token.verifyJWT,articlesController.articleForId);
//Creaciación del articulo
  articlesRouters.post("/createArticle",(req,res)=>res.send(articlesController.createArticle(req,res)));
//Modificación del articulo
  articlesRouters.put("/update/:articleId",articlesController.updateForId);
//Eliminación del articulo
  articlesRouters.delete("/delete/:articleId", articlesController.deleteForId);


module.exports=articlesRouters;