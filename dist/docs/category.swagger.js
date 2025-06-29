"use strict";
/**
 * @swagger
 * tags:
 *   name: Category
 *   description: Endpoints for managing product categories
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Create a new category
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Category name in Uzbek and Russian (JSON string)
 *                 example: '{"uz": "Sport", "ru": "Спорт"}'
 *               images:
 *                 type: string
 *                 format: binary
 *                 description: Upload a single image for the category
 *     responses:
 *       201:
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Category created successfully
 *               data:
 *                 _id: "665f9cdad8d34b001d335bea"
 *                 name:
 *                   uz: "Sport"
 *                   ru: "Спорт"
 *                 image: "/upload/image_7a82f5b7.jpg"
 */
/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Get all categories with optional search
 *     tags: [Category]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         required: false
 *         description: Search term to filter categories by name (in uz or ru)
 *     responses:
 *       200:
 *         description: List of categories
 *         content:
 *           application/json:
 *             example:
 *               message: Categories fetched successfully
 *               categories:
 *                 - _id: "665f9cdad8d34b001d335bea"
 *                   name:
 *                     uz: "Sport"
 *                     ru: "Спорт"
 *                   image: "/upload/image_7a82f5b7.jpg"
 */
/**
 * @swagger
 * /api/categories/{id}:
 *   get:
 *     summary: Get category by ID
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the category
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Category fetched successfully
 *               category:
 *                 _id: "665f9cdad8d34b001d335bea"
 *                 name:
 *                   uz: "Sport"
 *                   ru: "Спорт"
 *                 image: "/upload/image_7a82f5b7.jpg"
 *       404:
 *         description: Category not found
 */
/**
 * @swagger
 * /api/categories/{id}:
 *   patch:
 *     summary: Update category by ID
 *     description: At least one of `name` or `image` is required
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the category
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: JSON string with updated Uzbek and/or Russian name
 *                 example: '{"uz": "Yangilangan", "ru": "Обновленный"}'
 *               images:
 *                 type: string
 *                 format: binary
 *                 description: Upload a new image (replaces old one)
 *     responses:
 *       200:
 *         description: Category updated successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Category updated successfully
 *               category:
 *                 _id: "665f9cdad8d34b001d335bea"
 *                 name:
 *                   uz: "Yangilangan"
 *                   ru: "Обновленный"
 *                 image: "/upload/image_new.jpg"
 *       400:
 *         description: Missing required data (neither name nor image provided)
 *       404:
 *         description: Category not found
 */
/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     summary: Delete category by ID
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the category to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Category deleted successfully
 *               category:
 *                 _id: "665f9cdad8d34b001d335bea"
 *                 name:
 *                   uz: "Sport"
 *                   ru: "Спорт"
 *                 image: "/upload/image_deleted.jpg"
 *       404:
 *         description: Category not found
 */
