import "dotenv/config";
import express from "express";


export default class Routes {
  constructor(app) {
    this.app = app;
    this.uri = process.env.URI;
    this.initializeRoutes();
  }

  async initializeRoutes() {
    const { default: ProduitRoute } = await import("./produit.routes.js");
    const { default: CategorieRoute } = await import("./categorie.routes.js");

    const produitRoute = new ProduitRoute();
    const categorieRoute = new CategorieRoute();

    this.app.use(`${this.uri}/produits`, produitRoute.getRouter());
    this.app.use(`${this.uri}/categories`, categorieRoute.getRouter());
  }
}