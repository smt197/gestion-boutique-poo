/**
 * @swagger
 * tags:
 *   - name: Categories
 *     description: Category management
 *   - name: Fournisseurs
 *     description: Fournisseur management
 *   - name: Produits
 *     description: Product management
 *   - name: Ventes
 *     description: Sale management
 */

/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - libelle
 *             properties:
 *               libelle:
 *                 type: string
 *                 format: string
 *                 example: vetement
 *     responses:
 *       201:
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Category created successfully
 *                 category:
 *                   $ref: '#/components/schemas/Categorie'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Role not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: List of all categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Categorie'
 */

/**
 * @swagger
 * /api/categories/{categoryId}:
 *   delete:
 *     summary: Delete a category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Categorie'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /api/fournisseurs:
 *   post:
 *     summary: Create a new fournisseur
 *     tags: [Fournisseurs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - prenom
 *               - nom
 *               - email
 *               - telephone
 *               - adresse
 *             properties:
 *               prenom:
 *                 type: string
 *                 example: John
 *               nom:
 *                 type: string
 *                 example: Doe
 *               email:
 *                 type: string
 *                 example: [EMAIL_ADDRESS]
 *               telephone:
 *                 type: string
 *                 example: 123456789
 *               adresse:
 *                 type: string
 *                 example: 123 Main St
 *     responses:
 *       201:
 *         description: Fournisseur created successfully
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /api/fournisseurs:
 *   get:
 *     summary: Get all fournisseurs
 *     tags: [Fournisseurs]
 *     responses:
 *       200:
 *         description: List of all fournisseurs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Fournisseur'
 */

/**
 * @swagger
 * /api/produits:
 *   get:
 *     summary: Get all produits
 *     tags: [Produits]
 *     responses:
 *       200:
 *         description: List of all produits
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Produit'
 */
