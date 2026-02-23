import Database from "../config/db.js";
import { InterfaceRepository } from "./InterfaceRepository.js";

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
      data,
    });
  }

  async update(id, data) {
    return await this.model.update({
      where: { id: parseInt(id) },
      data,
    });
  }

  async delete(id) {
    return await this.model.delete({
      where: { id: parseInt(id) },
    });
  }
}
