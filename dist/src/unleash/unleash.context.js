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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _UnleashContext_customData;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnleashContext = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const unleash_constants_1 = require("./unleash.constants");
const defaultUserIdFactory = (request) => {
    var _a, _b;
    return (_b = (_a = request.user) === null || _a === void 0 ? void 0 : _a.id) === null || _b === void 0 ? void 0 : _b.toString();
};
let UnleashContext = class UnleashContext {
    constructor(request, options) {
        this.request = request;
        this.options = options;
        _UnleashContext_customData.set(this, void 0);
    }
    getUserId() {
        var _a;
        const userIdFactory = (_a = this.options.userIdFactory) !== null && _a !== void 0 ? _a : defaultUserIdFactory;
        return userIdFactory(this.request);
    }
    getRemoteAddress() {
        return this.request.ip;
    }
    getSessionId() {
        var _a, _b;
        return (((_a = this.request.session) === null || _a === void 0 ? void 0 : _a.id) ||
            ((_b = this.request.session) === null || _b === void 0 ? void 0 : _b.sessionId));
    }
    getRequest() {
        return this.request;
    }
    get customData() {
        return __classPrivateFieldGet(this, _UnleashContext_customData, "f");
    }
    extend(customData) {
        __classPrivateFieldSet(this, _UnleashContext_customData, customData, "f");
        return this;
    }
};
_UnleashContext_customData = new WeakMap();
UnleashContext = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.REQUEST }),
    __param(0, (0, common_1.Inject)(core_1.REQUEST)),
    __param(1, (0, common_1.Inject)(unleash_constants_1.UNLEASH_MODULE_OPTIONS)),
    __metadata("design:paramtypes", [Object, Object])
], UnleashContext);
exports.UnleashContext = UnleashContext;
//# sourceMappingURL=unleash.context.js.map