import dotenv from "dotenv";

process.env.NODE_ENV = process.env.NODE_ENV || "development"; // default as development
const envAvailable = dotenv.config();

if (envAvailable.error) {
  throw new Error("Couldn't find .env file");
}

const MONGODB_ATLAS_URL =
  "mongodb+srv://narasimha:narasimha@123@cluster0.jt1gk.mongodb.net/bookStore?retryWrites=true&w=majority";

export default {
  port: process.env.PORT || 8000, // PORT

  databaseURL: process.env.MONGODB_URI || MONGODB_ATLAS_URL,

  logs: {
    level: process.env.LOG_LEVEL || "silly", // LOGS
  },
  api: {
    prefix: "/api", // ROUTE LEVEL API
  },
  keyCloakConfig: {
    clientId: "bookstore",
    bearerOnly: true,
    serverUrl: "http://localhost:8080/auth",
    realm: "Bookstore",
    credentials: {
      secret: "a817a34d-6582-41bb-ad80-23b0bc1284b4",
    },
  },
};
