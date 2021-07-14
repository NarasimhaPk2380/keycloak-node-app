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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
var logger_1 = __importDefault(require("../../loaders/logger"));
var keycloak_service_1 = require("../../services/keycloak.service");
var http_errors_1 = require("http-errors");
var UsersController = /** @class */ (function () {
    function UsersController() {
    }
    UsersController.prototype.registerOktaUser = function (req, res, next) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var user, e_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        logger_1.default.debug("Register Okta User Api invoked");
                        console.log(req.headers.authorization);
                        req.body.accessToken = req.headers.authorization;
                        return [4 /*yield*/, new keycloak_service_1.KeyCloakService().register(req.body)];
                    case 1:
                        user = _c.sent();
                        logger_1.default.debug("Okta User is created ");
                        return [2 /*return*/, res.json(user).status(200)];
                    case 2:
                        e_1 = _c.sent();
                        logger_1.default.error(e_1.message);
                        console.log(e_1);
                        e_1.message = ((_b = (_a = e_1 === null || e_1 === void 0 ? void 0 : e_1.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.error) || e_1.message;
                        next(new http_errors_1.Unauthorized(e_1.message));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UsersController.prototype.loginOktaUser = function (req, res, next) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var sessionData, e_2;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 2, , 3]);
                        logger_1.default.debug("Login Okta User Api invoked");
                        return [4 /*yield*/, new keycloak_service_1.KeyCloakService().login(req.body)];
                    case 1:
                        sessionData = _d.sent();
                        logger_1.default.debug("Logged in and user session is created ");
                        return [2 /*return*/, res.json(sessionData).status(200)];
                    case 2:
                        e_2 = _d.sent();
                        logger_1.default.error(e_2.message);
                        console.log((_a = e_2 === null || e_2 === void 0 ? void 0 : e_2.response) === null || _a === void 0 ? void 0 : _a.data);
                        e_2.message = ((_c = (_b = e_2 === null || e_2 === void 0 ? void 0 : e_2.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.error) || e_2.message;
                        next(new http_errors_1.Unauthorized(e_2.message));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return UsersController;
}());
exports.UsersController = UsersController;
