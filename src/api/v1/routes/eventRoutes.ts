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


/**
 * @openapi
 * /events/:id:
 *   get:
 *     summary: display specific event based on ID
 *     tags: [Events]
 *     parameters:
 *       - id: string
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the event
 *     responses:
 *       '200':
 *         description: successfully retrieved event(s)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       '404':
 *         description: Event not found
 *       '403':
 *         description: Not authorized to update this event
 */
eventRouter.get(
  "/events/:id",
  validateRequest(itemSchemas.getById),
  getEventById,
);

/**
 * @openapi
 * /events/{id}:
 *   put:
 *     summary: Update a specific event's information
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Updated name of the event
 *               date:
 *                 type: string
 *                 format: date-time
 *                 description: Updated event date
 *               status:
 *                 type: string
 *                 enum: [Active, Cancelled, Completed]
 *                 description: Updated event status
 *               capacity:
 *                 type: number
 *                 description: Updated capacity
 *     responses:
 *       '201':
 *         description: Event created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       '400':
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
eventRouter.put("/events/:id", updateEvent);

eventRouter.delete("/events/:id", deleteEvent);

/**
 * @openapi
 * /events:
 *   get:
 *     summary: Retrieve a list of all listed events
 *     tags: [Events]
 *     responses:
 *       '200':
 *         description: Successfully retrieved events
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 events:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Event'
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
 *                   enum: ["active", "cancelled", "completed"]
 *                   example: ["active"]
 *               capacity:
 *                   type: number
 *                   description: The amount of people the event can host
 *                   example: "500"
 *     responses:
 *       '201':
 *         description: Event created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       '400':
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
eventRouter.post("/events", validateRequest(itemSchemas.create), createEvent);
