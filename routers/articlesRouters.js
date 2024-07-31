const express=require("express");
const articlesController=require("../controllers/articlesControllers.js");
const token= require("../services/jwt.js");
const articlesRouters=express.Router();

//Todos los Articulos
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
  articlesRouters.get("/search/id/:articleId",articlesController.articleForId);
//Creaciación del articulo
  articlesRouters.post("/createArticle",token.verifyJWT,articlesController.createArticle);
//Modificación del articulo
  articlesRouters.put("/update/:articleId",token.verifyJWT,articlesController.updateForId);
//Eliminación del articulo
  articlesRouters.delete("/delete/:articleId",token.verifyJWT, articlesController.deleteForId);


module.exports=articlesRouters;