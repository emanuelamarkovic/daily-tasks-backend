import { body, validationResult } from "express-validator";

const userValidator = [
  body("email").isEmail().withMessage("Invalid email").notEmpty(),
  body("username")
    .notEmpty()
    .isLength({ min: 3 })
    .withMessage("Name is required")
    .notEmpty(),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .notEmpty()
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i"),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
};
export { validate, userValidator };
