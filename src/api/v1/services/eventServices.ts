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
                date:data.date.toDate(),
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

export const deleteEventService = (id: string): boolean => {
  const index = events.findIndex((e) => e.id === id);

  if (index === -1) return false;

  events.splice(index, 1);
  return true;
};

export const updateEventService = (
  id: string,
  updatedEvent: Partial<Event>,
): Event | undefined => {
  const index = events.findIndex((e) => e.id === id);

  if (index === -1) return undefined;

  events[index] = {
    ...events[index],
    ...updatedEvent,
  };

  return events[index];
};
