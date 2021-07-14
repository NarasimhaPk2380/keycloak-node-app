import { Service } from "typedi";
import config from "../config";
import session from "express-session";
import KcAdminClient from "keycloak-admin";
import KeycloakConnect, { Keycloak } from "keycloak-connect";
import { ILoginData, IRegisterData } from "../interfaces/IUser";
import logger from "../loaders/logger";

const _keycloakAdmin = new KcAdminClient({
  baseUrl: config.keyCloakConfig.serverUrl,
  realmName: config.keyCloakConfig.realm,
});

@Service()
export class KeyCloakService {
  keycloak!: Keycloak;
  constructor() {}

  initKeycloak() {
    if (this.keycloak) {
      logger.debug("Trying to init Keycloak again!");
      return this.keycloak;
    } else {
      logger.debug("Initialized Keycloak...");
      var memoryStore = new session.MemoryStore();
      this.keycloak = new KeycloakConnect(
        { store: memoryStore },
        config.keyCloakConfig as any
      );
      return this.keycloak;
    }
  }

  getKeycloak() {
    if (!this.keycloak) {
      logger.error(
        "Keycloak has not been initialized. Please called init first."
      );
    }
    return this.keycloak;
  }

  async register(registerData: IRegisterData) {
    const { username, firstName, lastName, email, password } = registerData;
    _keycloakAdmin.accessToken = registerData.accessToken.split(" ")[1];
    const createdUser = await _keycloakAdmin.users.create({
      realm: config.keyCloakConfig.realm,
      username,
      email,
      firstName,
      lastName,
      emailVerified: true,
      enabled: true,
      realmRoles: ["app-user"],
      credentials: [{ type: "password", temporary: false, value: password }],
    });
    return createdUser;
  }
  async login(loginData: ILoginData) {
    const { username, password } = loginData;
    await _keycloakAdmin.auth({
      username,
      password,
      grantType: "password",
      clientId: "bookstore",
      clientSecret: "a817a34d-6582-41bb-ad80-23b0bc1284b4",
    });
    return {
      accessToken: _keycloakAdmin.accessToken,
      refreshToken: _keycloakAdmin.refreshToken,
    };
  }
}
