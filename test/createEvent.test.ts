import * as services from "../src/api/v1/services/eventServices"


// no mock yet. Going to integrate firebase after tests. Mistake? Maybe. I dunno im not bill gates.

describe("Create Event Validation", () => {
  it("Should successfully create an event given valid parameters", async () => {
    // Arrange
    const validEvent = {
      id: 1,
      name: "Test Event",
      date: new Date("2026-03-01"),
      capacity: 50,
      status: "Active",
      category: "Tech",
      registrationCount: 0,
    }

    // Act
    const result = await services.createEventService(validEvent)

    // Assert
    expect(result.id).toBe(validEvent.id)
    expect(result.status).toBe(validEvent.status)

  })
})
