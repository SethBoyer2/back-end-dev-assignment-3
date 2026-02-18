import express, { Router } from "express";
import { validateRequest } from "../middleware/validate";
import { itemSchemas } from "../validation/eventValidation";
import { getAllEvents, getEventById, updateEvent, deleteEvent, createEvent } from "../controllers/eventControllers";


export const eventRouter: Router = express.Router();

eventRouter.get("/events/:id", validateRequest(itemSchemas.getById), getEventById);

eventRouter.put("/events/:id", updateEvent);

eventRouter.delete("/events/:id", deleteEvent);

eventRouter.get("/events", getAllEvents);

eventRouter.post("/events", validateRequest(itemSchemas.create), createEvent);

