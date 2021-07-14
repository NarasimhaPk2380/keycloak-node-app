export interface IRegisterData {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  accessToken: string;
}

export interface IRegistrationResponse {
  id: string;
}

export interface ILoginData {
  username: string;
  password: string;
}

export interface ISession {
  sessionId: string;
  userId: string;
  userEmail: string;
}
