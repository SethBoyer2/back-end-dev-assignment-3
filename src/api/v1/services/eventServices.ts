import { Event } from "../models/models";

//const COLLECTION = "events";

const events: Event[] = [];

export const getAllEventsService = (): Event[] => {
  return events;
};

export const createEventService = (event: Event): Event => {
  events.push(event);
  return event;
};

export const getEventByIdService = (id: number): Event | undefined => {
  return events.find((event) => event.id === id);
};

export const deleteEventService = (id: number): boolean => {
  const index = events.findIndex((e) => e.id === id);

  if (index === -1) return false;

  events.splice(index, 1);
  return true;
};

export const updateEventService = (
  id: number,
  updatedEvent: Event,
): Event | undefined => {
  const index = events.findIndex((e) => e.id === id);

  if (index === -1) return undefined;

  events[index] = {
    ...events[index],
    ...updatedEvent,
  };

  return events[index];
};
