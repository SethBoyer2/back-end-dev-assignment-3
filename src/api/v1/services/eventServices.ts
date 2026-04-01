import { Event } from "../models/models";
import {
    createDocument,
    getDocuments,
    getDocumentById,
    updateDocument,
    deleteDocument,
} from "../repositories/firestoreRepository";


const COLLECTION = "events";

export const events: Event[] = [];

export const getAllEventsService = async (): Promise<Event[]> => {
    try {
        const snapshot = await getDocuments(COLLECTION);
        const events: Event[] = snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
                id: doc.id, // Had to explicitly pass all values, the spread from the demo file resulted in type errors
                name: data.name,
                date:data.date,
                capacity: data.capacity,
                registrationCount: data.registrationCount,
                status: data.status,
                category: data.category,
                createdAt: data.createdAt?.toDate() || new Date(),
                updatedAt: data.updatedAt?.toDate() || new Date(),
            } as Event;
        });
        return events;
    } catch (error) {
        throw error;
    }
};

export const createEventService = async (eventData: {
    name : String,
    date : Date,
    capacity : Number,
    registrationCount : Number,
    status : String,
    category : String
}): Promise<Event> => {
    try {
        const now = new Date();
        const newEventData = {
            ...eventData,
            createdAt: now,
            updatedAt: now,
        };

        const id = await createDocument<Event>(COLLECTION, newEventData);
        return { id, ...newEventData } as Event;
    } catch (error) {
        throw error;
    }
};

export const getEventByIdService = async (id: string): Promise<Event> => {
    try {
        const doc = await getDocumentById(COLLECTION, id);
        if (!doc) {
            throw new Error(`Item with ID ${id} not found`);
        }

        const data = doc.data();
        if (!data) {
          throw new Error(`No Valid Data.`)
        }

        const event: Event = {
            id: doc.id,
            name: data.name,
            date:data.date.toDate(),
            capacity: data.capacity,
            registrationCount: data.registrationCount,
            status: data.status,
            category: data.category,
            createdAt: data.createdAt?.toDate() || new Date(),
            updatedAt: data.updatedAt?.toDate() || new Date(),
        } as Event;

        return event;
    } catch (error) {
        throw error;
    }
};

export const deleteEventService = async (id: string): Promise<void> => {
    try {
        // Check if item exists before deleting
        const doc = await getDocumentById(COLLECTION, id);
        if (!doc) {
            throw new Error(`Item with ID ${id} not found`);
        }

        await deleteDocument(COLLECTION, id);
    } catch (error) {
        throw error;
    }
};

export const updateEventService = async (
    id: string,
    eventData: Pick<Event, "name" | "date" | "capacity" | "status" | "category">
): Promise<Event> => {
    try {
        const updateData = {
            ...eventData,
            updatedAt: new Date(),
        };

        await updateDocument<Event>(COLLECTION, id, updateData);

        // Return the updated item
        const updatedEvent = await getEventByIdService(id);
        return updatedEvent;
    } catch (error) {
        throw error;
    }
};
