import express, { Router } from "express";
import { validateRequest } from "../middleware/validate";
import { itemSchemas } from "../validation/eventValidation";
import {
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  createEvent,
} from "../controllers/eventControllers";

export const eventRouter: Router = express.Router();



eventRouter.get(
  "/events/:id",
  validateRequest(itemSchemas.getById),
  getEventById,
);
eventRouter.put("/events/:id", updateEvent);
eventRouter.delete("/events/:id", deleteEvent);
/**
 * @openapi
 * /events:
 *   get:
 *     summary: Retrieve a list of users with optional filtering
 *     tags: [Users]
 *     parameters:
 *       - name: limit
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Maximum number of users to return
 *       - name: role
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *           enum: [admin, user, guest]
 *         description: Filter users by role
 *     responses:
 *       '200':
 *         description: Successfully retrieved users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/validations/User'
 *                 total:
 *                   type: integer
 *                 page:
 *                   type: integer
 */
eventRouter.get("/events", getAllEvents);

/**
 * @openapi
 * /events:
 *   post:
 *     summary: Create a new event
 *     tags: [Events]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - date
 *               - status
 *               - capacity
 *             properties:
 *               name:
 *                   type: string
 *                   description: The name of the event
 *                   example: "Back-end beginners workshop"
 *               date:
 *                   type: Date
 *                   format: date-time
 *                   description: The date of the event
 *                   example: "2026-09-10T05:00:00.880Z"
 *               status:
 *                   type: string
 *                   description: The status of the event
 *                   example: ["Active", "Cancelled", "Completed"]
 *               capacity:
 *                   type: string
 *                   format: number
 *                   description: The amount of people the event can host
 *                   example: "500"
 *     responses:
 *       '201':
 *         description: Event created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       '400':
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
eventRouter.post("/events", validateRequest(itemSchemas.create), createEvent);
