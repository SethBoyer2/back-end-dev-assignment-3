import { events } from "../src/api/v1/services/eventServices"
import * as services from "../src/api/v1/services/eventServices"

describe("Get Events test", () => {
    beforeEach(() => {
        events.length = 0
        events.push (
            { id: "1", name: "Evil George Bush meeting", date: new Date(), capacity: 50, registrationCount: 0, status: "Active", category: "Tech" },
            { id: "2", name: "George Washington funtime", date: new Date(), capacity: 50, registrationCount: 0, status: "Active", category: "Tech" }
        )
    })
  it("Should return all events", async () => {

    // Act
    const result = await services.getAllEventsService()

    // Assert
    expect(result.length).toBe(2)

  })
})
