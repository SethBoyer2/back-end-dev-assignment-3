import { Request, Response, NextFunction } from "express";
import { Event } from "../models/models";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import {
  deleteEventService,
  getAllEventsService,
  getEventByIdService,
  createEventService,
  updateEventService,
} from "../services/eventServices";
import { successResponse } from "../models/responseModel";

export const getAllEvents = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const events: Event[] = await getAllEventsService();
        res.status(HTTP_STATUS.OK).json(
            successResponse(events, "Items retrieved successfully")
        );
    } catch (error) {
        next(error);
    }
};

export const deleteEvent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id = req.params.id as string;
        await deleteEventService(id);
        res.status(HTTP_STATUS.OK).json(
            successResponse(null, "Item deleted successfully")
        );
    } catch (error) {
        next(error);
    }
};

export const getEventById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id = req.params.id as string;
        const event: Event = await getEventByIdService(id);
        res.status(HTTP_STATUS.OK).json(
            successResponse(event, "Item retrieved successfully")
        );
    } catch (error) {
        next(error);
    }
};

export const createEvent = (req: Request, res: Response): void => {
  // Create new Event object
  try {
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
    String(req.params.id),
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
