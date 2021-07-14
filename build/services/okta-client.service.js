"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
exports.OktaClientService = void 0;
var okta_sdk_nodejs_1 = require("@okta/okta-sdk-nodejs");
var okta_auth_js_1 = require("@okta/okta-auth-js");
var http_errors_1 = require("http-errors");
var typedi_1 = require("typedi");
var OktaClientService = /** @class */ (function () {
    function OktaClientService(oktaClient, oktaAuthClient) {
        this.oktaClient = oktaClient;
        this.oktaAuthClient = oktaAuthClient;
    }
    OktaClientService.prototype.register = function (registerData) {
        return __awaiter(this, void 0, void 0, function () {
            var email, firstName, lastName, password, createdUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = registerData.email, firstName = registerData.firstName, lastName = registerData.lastName, password = registerData.password;
                        return [4 /*yield*/, this.oktaClient.createUser({
                                profile: { email: email, login: email, firstName: firstName, lastName: lastName },
                                credentials: { password: { value: password } },
                            })];
                    case 1:
                        createdUser = _a.sent();
                        return [2 /*return*/, createdUser];
                }
            });
        });
    };
    OktaClientService.prototype.sessionLogin = function (loginData) {
        return __awaiter(this, void 0, void 0, function () {
            var username, password, sessionToken, session, login, id, userId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        username = loginData.email, password = loginData.password;
                        return [4 /*yield*/, this.oktaAuthClient.signIn({
                                username: username,
                                password: password,
                            })];
                    case 1:
                        sessionToken = (_a.sent()).sessionToken;
                        return [4 /*yield*/, this.oktaClient.createSession({ sessionToken: sessionToken })];
                    case 2:
                        session = _a.sent();
                        login = session.login, id = session.id, userId = session.userId;
                        return [2 /*return*/, { sessionId: id, userEmail: login, userId: userId }];
                }
            });
        });
    };
    OktaClientService.prototype.getSessionBySessionId = function (sessionId, next) {
        return __awaiter(this, void 0, void 0, function () {
            var session, login, id, userId, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.oktaClient.getSession(sessionId)];
                    case 1:
                        session = _a.sent();
                        login = session.login, id = session.id, userId = session.userId;
                        return [2 /*return*/, { sessionId: id, userEmail: login, userId: userId }];
                    case 2:
                        e_1 = _a.sent();
                        next(new http_errors_1.Unauthorized("Please login with the okta user, else register user"));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OktaClientService = __decorate([
        typedi_1.Service(),
        __metadata("design:paramtypes", [okta_sdk_nodejs_1.Client, okta_auth_js_1.OktaAuth])
    ], OktaClientService);
    return OktaClientService;
}());
exports.OktaClientService = OktaClientService;
