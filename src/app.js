import "dotenv/config";
import express from "express";
import CategorieRoute from "./routes/categorie.routes.js";
import ProduitRoute from "./routes/produit.routes.js";
import { setupSwagger } from "./config/swagger.js";

export default class App {
  constructor() {
    this.app = express();
    this.uri = process.env.URI;
    this.app.use(express.json());

    setupSwagger(this.app);

    this.app.use(`${this.uri}/categories`, new CategorieRoute().getRouter());
    this.app.use(`${this.uri}/produits`, new ProduitRoute().getRouter());
  }

  getApp() {
    return this.app;
  }
}
