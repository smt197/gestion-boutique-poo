import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Gestion Boutique API",
      version: "1.0.0",
      description: "API documentation for the Boutique Management System",
      contact: {
        name: "Boutique Team",
        email: "contact@boutique.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3001",
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Enter your JWT token",
        },
      },
      schemas: {
        Categorie: {
          type: "object",
          required: ["libelle"],
          properties: {
            id: { type: "integer", example: 1 },
            libelle: { type: "string", example: "Informatique" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        Produit: {
          type: "object",
          required: ["libelle", "prixUnitaire", "categorieId"],
          properties: {
            id: { type: "integer", example: 1 },
            libelle: { type: "string", example: "Ordinateur Portable" },
            qteStock: { type: "integer", example: 10 },
            prixUnitaire: {
              type: "number",
              format: "float",
              example: 500000.0,
            },
            categorieId: { type: "integer", example: 1 },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        Vente: {
          type: "object",
          required: ["quantite", "montantTotal", "produitId"],
          properties: {
            id: { type: "integer", example: 1 },
            date: { type: "string", format: "date-time" },
            quantite: { type: "integer", example: 2 },
            montantTotal: {
              type: "number",
              format: "float",
              example: 1000000.0,
            },
            produitId: { type: "integer", example: 1 },
            createdAt: { type: "string", format: "date-time" },
          },
        },
        Fournisseur: {
          type: "object",
          required: ["prenom", "nom", "email"],
          properties: {
            id: { type: "integer", example: 1 },
            prenom: { type: "string", example: "Jean" },
            nom: { type: "string", example: "Dupont" },
            email: {
              type: "string",
              format: "email",
              example: "jean.dupont@example.com",
            },
            telephone: { type: "string", example: "+221771234567" },
            adresse: { type: "string", example: "Dakar, Sénégal" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        FournisseurProduit: {
          type: "object",
          required: ["fournisseurId", "produitId"],
          properties: {
            fournisseurId: { type: "integer", example: 1 },
            produitId: { type: "integer", example: 1 },
            prixFournisseur: {
              type: "number",
              format: "float",
              example: 450000.0,
            },
            delaiLivraison: { type: "integer", example: 5 },
          },
        },
        Error: {
          type: "object",
          properties: {
            message: { type: "string", example: "Error message" },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/*.js", "./src/controllers/*.js", "./src/config/swagger-annotations.js"],
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app) => {
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      customCss: ".swagger-ui .topbar { display: none }",
      customSiteTitle: "Gestion Boutique API Docs",
    }),
  );

  app.get("/api-docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
};

export default swaggerSpec;
