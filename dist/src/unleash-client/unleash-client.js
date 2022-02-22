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
var UnleashClient_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnleashClient = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const unleash_client_constants_1 = require("./unleash-client.constants");
let UnleashClient = UnleashClient_1 = class UnleashClient {
    constructor(http, options) {
        this.http = http;
        this.options = options;
        this.logger = new common_1.Logger(UnleashClient_1.name);
    }
    async request(config) {
        var _a, _b, _c, _d;
        const method = (_a = config.method) !== null && _a !== void 0 ? _a : '(unknown method)';
        const baseUrl = (_b = this.http.axiosRef.defaults.baseURL) !== null && _b !== void 0 ? _b : '(unknown base url)';
        const url = (_c = config.url) !== null && _c !== void 0 ? _c : '(unknown url)';
        this.logger.debug(`Request: ${method} ${baseUrl}${url}`);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        (_d = this.options.logger) === null || _d === void 0 ? void 0 : _d.info(`Request: ${method} ${baseUrl}${url}`);
        const response = await (0, rxjs_1.firstValueFrom)(this.http.request(config));
        return response.data;
    }
    async get(url, config) {
        return this.request({
            ...config,
            method: 'GET',
            url,
        });
    }
    async post(url, data, config) {
        return this.request({
            ...config,
            data: data !== null && data !== void 0 ? data : {},
            method: 'POST',
            url,
        });
    }
};
UnleashClient = UnleashClient_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(unleash_client_constants_1.UNLEASH_CLIENT_OPTIONS)),
    __metadata("design:paramtypes", [axios_1.HttpService, Object])
], UnleashClient);
exports.UnleashClient = UnleashClient;
//# sourceMappingURL=unleash-client.js.map