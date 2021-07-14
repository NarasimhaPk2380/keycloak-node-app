import { Request } from "express";
import {
  createMocks,
  mockNext,
  mockResponse,
} from "../../helpers/tests/mocking-funtions";
// import { OktaClientService } from "../../services/okta-client.service";
import {
  oktaAuthClient,
  oktaClient,
} from "../../helpers/tests/mocking-funtions";
import { UsersController } from "./users.controller";

const mockRequest = <Request>{
  body: {
    email: "hello@gmail.com",
    firstName: "123",
    lastName: "test",
    password: "12345678",
  },
};

const availableMethodsInOktaClientSrvc: any = {
  register: { id: "123" },
  sessionLogin: {
    sessionId: "123",
    userId: "1",
    userEmail: "hello@gmail.com",
  },
};

describe("UsersController success cases", () => {
  let usersController: UsersController;
  // const OktaClientServiceMock = <jest.Mock<OktaClientService>>OktaClientService;
  // const instanceOfOktaClientServiceMock = new OktaClientServiceMock(
  //   oktaClient,
  //   oktaAuthClient
  // );
  // createMocks(
  //   instanceOfOktaClientServiceMock,
  //   availableMethodsInOktaClientSrvc,
  //   false
  // );

  beforeEach(() => {
    usersController = new UsersController();
    // usersController.oktaClientService = instanceOfOktaClientServiceMock;
  });

  it("Should create", () => {
    expect(usersController).toBeTruthy();
  });

  it("Should create user", async () => {
    const res = mockResponse();
    await usersController.registerOktaUser(mockRequest, res, mockNext);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      statusCode: 200,
      message: "Okta user has been created. Now you can login",
    });
  });
  it("Should login user", async () => {
    const res = mockResponse();
    await usersController.loginOktaUser(mockRequest, res, mockNext);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      availableMethodsInOktaClientSrvc.sessionLogin
    );
  });
});

describe("UsersController failure cases", () => {
  let usersController: UsersController;
  // const OktaClientServiceMock = <jest.Mock<OktaClientService>>OktaClientService;
  // const instanceOfOktaClientServiceMock = new OktaClientServiceMock(
  //   oktaClient,
  //   oktaAuthClient
  // );
  // createMocks(
  //   instanceOfOktaClientServiceMock,
  //   availableMethodsInOktaClientSrvc,
  //   true
  // );

  beforeEach(() => {
    usersController = new UsersController();
    // usersController.oktaClientService = instanceOfOktaClientServiceMock;
  });

  it("Should create", () => {
    expect(usersController).toBeTruthy();
  });

  it("Should throw error while creating user", async () => {
    const res = mockResponse();
    await usersController.registerOktaUser(mockRequest, res, mockNext);
    expect(mockNext).toHaveBeenCalledWith("Failed");
  });
  it("Should throw error", async () => {
    const res = mockResponse();
    await usersController.loginOktaUser(mockRequest, res, mockNext);
    expect(mockNext).toHaveBeenCalledWith("Failed");
  });
});
