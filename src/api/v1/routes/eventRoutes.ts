import express, { Router } from "express";


export const eventRouter: Router = express.Router()

eventRouter.get("/events/:id")
eventRouter.put("/events/:id")
eventRouter.delete("/events/:id")
eventRouter.get("/events")
eventRouter.post("/events")
