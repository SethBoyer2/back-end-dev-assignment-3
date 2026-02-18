import Joi from "joi";

export const itemSchemas = {
  create: {
    body: Joi.object({
      name: Joi.string().required().min(3).max(100).messages({
        "any.required": "Name is required",
        "string.empty": "Name cannot be empty.",
      }),

      date: Joi.date().iso().required().messages({
        "any.required": "Date is required.",
        "date.empty": "Date cannot be empty.",
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

  getById: {
    params: Joi.object({
        id: Joi.string().required().messages({
            "any.required": "Item ID is required",
            "string.empty": "Item ID cannot be empty"
        })
    })
  }
};
