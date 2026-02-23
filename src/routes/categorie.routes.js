import { Router } from "express";
import { CategorieController } from "../controllers/categorie.controller.js";

export default class CategorieRoute {
  categorie = new CategorieController();
  router = Router();

  constructor() {
    
    this.router.post("/create", (req, res) =>
      this.categorie.createCategory(req, res),
    );

    
    this.router.get("/", (req, res) => this.categorie.getAllCategories(req, res));

   
    this.router.delete("/:categoryId", (req, res) =>
      this.categorie.deleteCategory(req, res),
    );
  }

  getRouter() {
    return this.router;
  }
}
