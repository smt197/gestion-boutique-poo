import HttpError from "../utils/httpError.js";
import CategorieRepository from "../repositories/categorie.repo.js";

export class CategorieController {
  constructor() {
    this.repository = new CategorieRepository();
    this.httpError = new HttpError();
  }

  async createCategory(req, res) {
    try {
      const { libelle } = req.body;
      const newCategory = await this.repository.create({
        libelle,
      });
      res.status(201).json(newCategory);
    } catch (error) {
      console.error("Error creating category:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async getAllCategories(req, res) {
    try {
      const categories = await this.repository.findAll();
      res.status(200).json(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async deleteCategory(req, res) {
    try {
      const { categoryId } = req.params;
      await this.repository.delete(categoryId);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting category:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
