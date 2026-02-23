import { Request, Response, NextFunction } from "express"
import { Event } from "../models/models"
import { HTTP_STATUS } from "../../../constants/httpConstants"
import {
  deleteEventService,
  getAllEventsService,
  getEventByIdService,
  createEventService,
  updateEventService,
} from "../services/eventServices"
import { successResponse } from "../models/responseModel"

export const getAllEvents = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const events: Event[] = await getAllEventsService()
        res.status(HTTP_STATUS.OK).json(
            successResponse(events, "Items retrieved successfully")
        )
    } catch (error) {
        next(error)
    }
}

export const deleteEvent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id = req.params.id as string
        await deleteEventService(id)
        res.status(HTTP_STATUS.OK).json(
            successResponse(null, "Item deleted successfully")
        )
    } catch (error) {
        next(error)
    }
}

export const getEventById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id = req.params.id as string
        const event: Event = await getEventByIdService(id)
        res.status(HTTP_STATUS.OK).json(
            successResponse(event, "Item retrieved successfully")
        )
    } catch (error) {
        next(error)
    }
}

export const createEvent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  // Create new Event object
  try {
    const event: Event = req.body
    const createdEvent = await createEventService(event)

        const newEvent: Event = await createEventService(createdEvent)
        res.status(HTTP_STATUS.CREATED).json(
            successResponse(newEvent, "Item created successfully")
        )
    } catch (error) {
        next(error)
    }
}

export const updateEvent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id = req.params.id as string
        const { name, date, capacity, status, category } = req.body

        // Create update data object with only the fields that can be updated
        const updateData = { name, date, capacity, status, category }

        const updatedEvent: Event = await updateEventService(id, updateData)
        res.status(HTTP_STATUS.OK).json(
            successResponse(updatedEvent, "Item updated successfully")
        )
    } catch (error) {
        next(error)
    }
}
