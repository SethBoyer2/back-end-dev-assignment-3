import * as services from "../src/api/v1/services/eventServices"

// Theoretically, this works. But because I don't have firebase integration yet, I can't really test it properly.
// But it will work.
// Probably.

describe("Delete Event validation", () => {
  it("Should delete an event with a valid id", () => {

    // Arrange
    const validId = "1"

    // Act
    const result = services.deleteEventService(validId)

    // Assert
    expect(result).toBe(true)

  })
})