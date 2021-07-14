"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var okta_client_service_1 = require("./okta-client.service");
var mocking_funtions_1 = require("../helpers/tests/mocking-funtions");
var mocking_funtions_2 = require("../helpers/tests/mocking-funtions");
var http_errors_1 = require("http-errors");
var registerMockData = {
    email: "hello@gmail.com",
    firstName: "hello",
    lastName: "test",
    password: "hello",
};
var loginMockData = {
    email: "hello@gmail.com",
    password: "hello",
};
describe("OktaClientService", function () {
    var oktaClientService;
    beforeEach(function () {
        oktaClientService = new okta_client_service_1.OktaClientService(mocking_funtions_1.oktaClient, mocking_funtions_1.oktaAuthClient);
    });
    it("Should create", function () {
        expect(oktaClientService).toBeTruthy();
    });
    it("Should create new oktauser", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, oktaClientService.register(registerMockData)];
                case 1:
                    res = _a.sent();
                    expect(res === null || res === void 0 ? void 0 : res.id).toBeDefined();
                    return [2 /*return*/];
            }
        });
    }); });
    it("Should login with oktauser", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, oktaClientService.sessionLogin(loginMockData)];
                case 1:
                    res = _a.sent();
                    expect(res.sessionId).toBeDefined();
                    return [2 /*return*/];
            }
        });
    }); });
    it("Should get session with oktauser sessionId", function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, oktaClientService.getSessionBySessionId("12345", function () { })];
                case 1:
                    res = _a.sent();
                    expect(res === null || res === void 0 ? void 0 : res.sessionId).toBeDefined();
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("OktaClientService failure case", function () {
    var oktaClientService;
    beforeEach(function () {
        mocking_funtions_1.oktaClient.getSession = function (data) {
            throw new Error();
        };
        oktaClientService = new okta_client_service_1.OktaClientService(mocking_funtions_1.oktaClient, mocking_funtions_1.oktaAuthClient);
    });
    it("Should create", function () {
        expect(oktaClientService).toBeTruthy();
    });
    it("Should get unauthorised", function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, oktaClientService.getSessionBySessionId("", mocking_funtions_2.mockNext)];
                case 1:
                    _a.sent();
                    expect(mocking_funtions_2.mockNext).toBeCalledWith(new http_errors_1.Unauthorized("Please login with the okta user, else register user"));
                    return [2 /*return*/];
            }
        });
    }); });
});
