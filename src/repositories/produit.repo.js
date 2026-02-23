import Database from "../config/db.js";
import { InterfaceRepository } from "./InterfaceRepository.js";
import cloudinary from '../config/cloudinary';

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

    let mediaUrl;
        if (file) {
            const media = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { resource_type: 'auto' },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );
                uploadStream.end(file.buffer);
            });
            mediaUrl = media.secure_url;
        }

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
