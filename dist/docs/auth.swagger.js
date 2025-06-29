"use strict";
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User authentication endpoints
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Log in a user with phone number and password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - phoneNumber
 *               - password
 *             properties:
 *               phoneNumber:
 *                 type: string
 *                 example: "+998901234567"
 *               password:
 *                 type: string
 *                 example: yourStrongPassword
 *     responses:
 *       200:
 *         description: Logged in successfully
 *         content:
 *           application/json:
 *             example:
 *               message: User successfully logged in
 *               accessToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *               user:
 *                 _id: "665f9cdad8d34b001d335bea"
 *                 fullName: "Ali Valiyev"
 *                 phoneNumber: "+998901234567"
 *                 role: "customer"
 *       400:
 *         description: Missing phone number or password
 *       401:
 *         description: Invalid password
 *       404:
 *         description: User not found
 */
