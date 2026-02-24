import { Router } from "express";
import ProduitController from "../controllers/produit.controller.js";
import MulterConfig from "../config/multer.js";

export default class ProduitRoute {
  constructor() {
    this.controller = new ProduitController();
    this.multerConfig = new MulterConfig();
    this.router = Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get("/", (req, res) => this.controller.index(req, res));
    this.router.get("/:id", (req, res) => this.controller.show(req, res));
    this.router.post("/", this.multerConfig.getUpload().single("image"), (req, res) =>
      this.controller.store(req, res),
    );
    this.router.put("/:id", this.multerConfig.getUpload().single("image"), (req, res) =>
      this.controller.update(req, res),
    );
    this.router.delete("/:id", (req, res) => this.controller.destroy(req, res));
  }

  getRouter() {
    return this.router;
  }
}
