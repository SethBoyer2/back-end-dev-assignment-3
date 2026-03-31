import Joi from "joi";

/**
 * @openapi
 * components:
 *   schemas:
 *     Event:
 *       type: object
 *       required:
 *         - name
 *         - date
 *         - capacity
 *         - status
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the event
 *           example: "Joe Rogan blows stuff up LIVE"
 *         date:
 *           type: string
 *           format: date-time
 *           description: The date of the event
 *           example: "2024-01-20T14:45:00Z"
 *         capacity:
 *           type: number
 *           description: Total capacity the event can host
 *           example: 500
 *         status:
 *           type: string
 *           description: Status of the event (Active, Cancelled, Complete)
 *           example: "Active"
 *         registrationCount:
 *           type: number
 *           description: The number of people registered for the event
 *           example: 450
 */
export const itemSchemas = {
  create: {
    body: Joi.object({
      name: Joi.string().required().min(3).max(100).messages({
        "any.required": "Name is required",
        "string.empty": "Name cannot be empty.",
      }),

      date: Joi.date().iso().greater('now').required().messages({
        "any.required": "Date is required.",
        "date.empty": "Date cannot be empty.",
        "date.greater": "The event date must be in the future."
      }),

      capacity: Joi.number().integer().min(5).required().messages({
        "any.required": "Capacity is required.",
        "number.empty": "Capacity cannot be empty.",
      }),

      status: Joi.string()
        .valid("Active", "Cancelled", "Completed")
        .required()
        .messages({
          "any.required": "Status is required",
          "string.empty": "Status cannot be empty",
          "any.only": "Status must be Active, Cancelled or Completed.",
        }),

      registrationCount: Joi.number()
        .integer()
        .optional()
        .min(0)
        .max(Joi.ref("capacity"))
        .messages({
          "number.max": "Registration Count cannot exceed event capacity",
        }),
    }),
  },
  /**
 * @openapi
 * components:
 *   schemas:
 *     Error:
 *       type: object
 *       required:
 *         - error
 *         - message
 *       properties:
 *         error:
 *           type: string
 *           description: Error type or code
 *           example: "VALIDATION_ERROR"
 *         message:
 *           type: string
 *           description: Human-readable error message
 *           example: "Date cannot be empty"
 *         details:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               field:
 *                 type: string
 *                 example: "Capacity"
 *               issue:
 *                 type: string
 *                 example: "Capacity field cannot be empty."
 *           description: Detailed validation errors (optional)
 */

  getById: {
    params: Joi.object({
      id: Joi.string().required().messages({
        "any.required": "Item ID is required",
        "string.empty": "Item ID cannot be empty",
      }),
    }),
  },
};
