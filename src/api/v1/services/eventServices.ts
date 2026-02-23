import { Event } from "../models/models";
import * as firestoreRepository from "../repositories/firestoreRepository"


const COLLECTION = "events";

export const events: Event[] = [];

export const getAllEventsService = (): Event[] => {
  return events;
};

export const createEventService = (event: Event): Event => {
  events.push(event);
  return event;
};

export const getEventByIdService = (id: string): Event | undefined => {
  return events.find((event) => event.id === id);
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
