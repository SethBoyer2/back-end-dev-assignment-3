import * as services from "../src/api/v1/services/eventServices"
import { events } from "../src/api/v1/services/eventServices"

// no mock yet. Going to integrate firebase after tests. Mistake? Maybe. I dunno im not bill gates.

describe("Create Event Validation", () => {
    beforeEach(() => {
        events.length = 0
        events.push (
            { id: "1", name: "Evil George Bush meeting", date: new Date(), capacity: 50, registrationCount: 0, status: "Active", category: "Tech" },
            { id: "2", name: "George Washington funtime", date: new Date(), capacity: 50, registrationCount: 0, status: "Active", category: "Tech" }
        )
    })
  it("Should update the name and capacity of the given event", async () => {
    // Arrange
    const updatedData = {
        name: "Did you know that godzilla is probably real",
        capacity: 20000
    }
    // Act
    const result = await services.updateEventService("1", updatedData)

    // Assert
    expect(result?.name).toBe("Did you know that godzilla is probably real")
    expect(result?.capacity).toBe(20000)

  })
})