import ProduitRepository from "../repositories/produit.repo.js";
import cloudinary from "../config/cloudinary.js";
import HttpError from "../utils/httpError.js";

export default class ProduitController {
  constructor() {
    this.repository = new ProduitRepository();
  }

  async index(req, res) {
    try {
      const produits = await this.repository.findAll();
      res.status(200).json(produits);
    } catch (error) {
      console.error("Error fetching products:", error);
      res
        .status(500)
        .json({ message: "Erreur lors de la récupération des produits" });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const produit = await this.repository.findById(id);
      if (!produit) {
        return res.status(404).json({ message: "Produit non trouvé" });
      }
      res.status(200).json(produit);
    } catch (error) {
      console.error("Error fetching product:", error);
      res
        .status(500)
        .json({ message: "Erreur lors de la récupération du produit" });
    }
  }

  async store(req, res) {
    try {
      const { libelle, qteStock, prixUnitaire, categorieId } = req.body;
      let imageUrl = null;

      if (req.file) {
        const result = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: "produits" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            },
          );
          uploadStream.end(req.file.buffer);
        });
        imageUrl = result.secure_url;
      }

      const newProduit = await this.repository.create({
        libelle,
        qteStock: parseInt(qteStock),
        prixUnitaire: parseFloat(prixUnitaire),
        categorieId: parseInt(categorieId),
        image: imageUrl,
      });

      res.status(201).json(newProduit);
    } catch (error) {
      console.error("Error creating product:", error);
      res
        .status(500)
        .json({ message: "Erreur lors de la création du produit" });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { libelle, qteStock, prixUnitaire, categorieId } = req.body;
      let updateData = { libelle, qteStock, prixUnitaire, categorieId };

      if (req.file) {
        const result = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: "produits" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            },
          );
          uploadStream.end(req.file.buffer);
        });
        updateData.image = result.secure_url;
      }

      const updatedProduit = await this.repository.update(id, updateData);
      res.status(200).json(updatedProduit);
    } catch (error) {
      console.error("Error updating product:", error);
      res
        .status(500)
        .json({ message: "Erreur lors de la modification du produit" });
    }
  }

  async destroy(req, res) {
    try {
      const { id } = req.params;
      await this.repository.delete(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting product:", error);
      res
        .status(500)
        .json({ message: "Erreur lors de la suppression du produit" });
    }
  }
}
