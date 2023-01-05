import { validationResult, body } from "express-validator";
import { Request, Response, NextFunction } from "express";

function validationErrorHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      msg: "Validation Error. Check data.",
      error: errors.array(),
    });
  }

  next();
  return;
}

class UserValidator {
  public static registrationValidations = [
    body("fullName")
      .notEmpty()
      .isString()
      .isLength({
        min: 3,
      })
      .withMessage("Full name is required!"),
    body("email")
      .notEmpty()
      .isEmail()
      .withMessage("Enter a valid email address!"),
    body("username")
      .notEmpty()
      .isString()
      .isLength({
        min: 4,
      })
      .withMessage("Pick a username!"),
    body("password")
      .notEmpty()
      .isString()
      .isLength({
        min: 8,
      })
      .withMessage("Password should be at minimum 8 characters"),
    body("phone")
      .notEmpty()
      .isString()
      .isLength({
        min: 10,
        max: 13,
      })
      .withMessage(
        "Enter a valid phone number(10 digits minimum, 13 digits maximum, with country code)"
      ),
    validationErrorHandler,
  ];
  public static loginValidations = [
    body("username")
      .notEmpty()
      .isString()
      .isLength({
        min: 4,
      })
      .withMessage("Enter your username!"),
    body("password")
      .notEmpty()
      .isString()
      .isLength({
        min: 8,
      })
      .withMessage("Password should be at minimum 8 characters"),
    validationErrorHandler,
  ];
}

class ReviewValidator {}
class ProductValidator {}
class CommentValidator {}

export { UserValidator, ReviewValidator, ProductValidator, CommentValidator };
