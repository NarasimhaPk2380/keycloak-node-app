import { Router } from "express";
import Container from "typedi";
import {
  loginUserSchema,
  regiserUserSchema,
} from "../../helpers/validation_schema";
import { usersController } from "../controllers";
import { joiValidation } from "../middlewares/joi-validation.middleware";

const router = Router();
export default (app: Router) => {
  app.use("/oktauser", router);
  router.post(
    "/register",
    joiValidation(regiserUserSchema),
    usersController.registerOktaUser.bind(usersController)
  );
  router.post("/login", usersController.loginOktaUser.bind(usersController));
};
