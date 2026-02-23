import Database from "../config/db.js";
import { InterfaceRepository } from "./InterfaceRepository.js";

export default class CategorieRepository extends InterfaceRepository {
  constructor() {
    super();
    this.db = new Database();
    this.model = this.db.prisma.categorie;
  }

  async findAll() {
    return await this.model.findMany();
  }

  async findById(id) {
    return await this.model.findUnique({
      where: { id: parseInt(id) },
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
