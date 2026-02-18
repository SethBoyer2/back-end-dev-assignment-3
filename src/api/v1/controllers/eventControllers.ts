import { Request, Response } from "express";
import { Event } from "../models/models";
import { HTTP_STATUS } from "src/constants/httpConstants";
import {
  deleteEventService,
  getAllEventsService,
  getEventByIdService,
  createEventService,
  updateEventService,
} from "../services/eventServices";

export const getAllEvents = (req: Request, res: Response): void => {
  try {
    const events = getAllEventsService();
    res.status(HTTP_STATUS.OK).json({
      message: "List of events retrieved",
      data: events,
    });
  } catch (error: unknown) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Failed to retrieve events",
    });
  }
};

export const deleteEvent = (req: Request, res: Response): void => {
  const result = deleteEventService(Number(req.params.id));

  if (result) {
    res
      .status(HTTP_STATUS.NO_CONTENT)
      .json({ message: "Event deleted successfully" });
  } else {
    res.status(HTTP_STATUS.NOT_FOUND).send();
  }
};

export const getEventById = (req: Request, res: Response): void => {
  const event: Event | undefined = getEventByIdService(Number(req.params.id));

  if (event) {
    res.status(HTTP_STATUS.OK).json({ message: "Event found", data: event });
  } else {
    res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Event not found" });
  }
};

export const createEvent = (req: Request, res: Response): void => {
  // Create new Event object
  try {
    if (!req.body.title || typeof req.body.title !== "string") {
      throw new Error("Missing required field: Title");
    }
    if (!req.body.description || typeof req.body.description !== "string") {
      throw new Error("Missing required field: description");
    }
    if (!req.body.priority || typeof req.body.priority !== "string") {
      throw new Error("Missing required field: priority");
    }

    const event: Event = req.body;
    const createdEvent = createEventService(event);

    res.status(HTTP_STATUS.CREATED).json({
      message: "Event created successfully.",
      data: createdEvent,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const updateEvent = (req: Request, res: Response): void => {
  const updatedEvent: Event = req.body;
  const result: Event | undefined = updateEventService(
    Number(req.params.id),
    updatedEvent,
  );

  if (result) {
    res
      .status(HTTP_STATUS.OK)
      .json({ message: "Event Updated.", data: result });
  } else {
    res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Event not found" });
  }
};

// getAllEventsService, createEventService, getEventByIdService, deleteEventService, updateEventService
