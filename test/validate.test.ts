// import { Request, Response, NextFunction } from "express";
// import { validateRequest } from "../src/api/v1/middleware/validate";
// import { itemSchemas } from "../src/api/v1/validation/eventValidation";
// import { HTTP_STATUS } from "src/constants/httpConstants";

// describe("Validation Middleware", () => {
//     let mockReq: Partial<Request>;
//     let mockRes: Partial<Response>;
//     let mockNext: NextFunction;

//     beforeEach(() => {
//         mockReq = {
//             body: {},
//             params: {},
//             query: {},
//         };
//         mockRes = {
//             status: jest.fn().mockReturnThis(),
//             json: jest.fn(),
//         };
//         mockNext = jest.fn();
//     });

//     it("should pass validation for valid item data", () => {
//         // Arrange
//         mockReq.body = {
//             name: "Valid Item",
//             description: "Valid description",
//         };
//         const middleware = validateRequest(itemSchemas.create);

//         // Act
//         middleware(mockReq as Request, mockRes as Response, mockNext);

//         // Assert
//         expect(mockNext).toHaveBeenCalled();
//         expect(mockRes.status).not.toHaveBeenCalled();
//     });
// });
