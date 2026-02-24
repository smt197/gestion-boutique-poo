import Database from "../config/db.js";
import { InterfaceRepository } from "./InterfaceRepository.js";
import cloudinary from "../config/cloudinary.js";

export default class ProduitRepository extends InterfaceRepository {
  constructor() {
    super();
    this.db = new Database();
    this.model = this.db.prisma.produit;
  }

  async findAll() {
    return await this.model.findMany({
      include: {
        categorie: true,
      },
    });
  }

  async findById(id) {
    return await this.model.findUnique({
      where: { id: parseInt(id) },
      include: {
        categorie: true,
      },
    });
  }

  async create(data) {
    return await this.model.create({
      data: {
        libelle: data.libelle,
        qteStock: parseInt(data.qteStock) || 0,
        prixUnitaire: parseFloat(data.prixUnitaire),
        categorieId: parseInt(data.categorieId),
        image: data.image || null,
      },
      include: {
        categorie: true,
      },
    });
  }

  async update(id, data) {
    const updateData = {};
    if (data.libelle) updateData.libelle = data.libelle;
    if (data.qteStock !== undefined)
      updateData.qteStock = parseInt(data.qteStock);
    if (data.prixUnitaire !== undefined)
      updateData.prixUnitaire = parseFloat(data.prixUnitaire);
    if (data.categorieId) updateData.categorieId = parseInt(data.categorieId);
    if (data.image) updateData.image = data.image;

    return await this.model.update({
      where: { id: parseInt(id) },
      data: updateData,
      include: {
        categorie: true,
      },
    });
  }

  async delete(id) {
    return await this.model.delete({
      where: { id: parseInt(id) },
    });
  }
}
