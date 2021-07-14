import { NextFunction, Request, Response } from "express";
import logger from "../../loaders/logger";
import { ILoginData, IRegisterData } from "../../interfaces/IUser";
import { KeyCloakService } from "../../services/keycloak.service";
import { Unauthorized } from "http-errors";

export class UsersController {
  constructor() {}
  async registerOktaUser(req: Request, res: Response, next: NextFunction) {
    try {
      logger.debug("Register Okta User Api invoked");
      req.body.accessToken = req.headers.authorization;
      const user = await new KeyCloakService().register(
        req.body as IRegisterData
      );
      logger.debug("Okta User is created ");
      return res.json(user).status(200);
    } catch (e) {
      logger.error(e.message);
      console.log(e);
      e.message = e?.response?.data?.error || e.message;
      next(new Unauthorized(e.message));
    }
  }
  async loginOktaUser(req: Request, res: Response, next: NextFunction) {
    try {
      logger.debug("Login Okta User Api invoked");
      const sessionData = await new KeyCloakService().login(
        req.body as ILoginData
      );
      logger.debug("Logged in and user session is created ");
      return res.json(sessionData).status(200);
    } catch (e) {
      logger.error(e.message);
      e.message = e?.response?.data?.error || e.message;
      next(new Unauthorized(e.message));
    }
  }
}
