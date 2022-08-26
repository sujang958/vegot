"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const https_1 = __importDefault(require("https"));
const url_1 = require("url");
const vegot = (url, options) => {
    return new Promise((resolve, reject) => {
        var _a;
        const { hostname, pathname, protocol, port, hash, search } = new url_1.URL(url);
        (options === null || options === void 0 ? void 0 : options.headers) && delete options.headers["Content-Length"];
        const req = (protocol === "https:" ? https_1.default.request : http_1.default.request)({
            hostname,
            path: pathname,
            port,
            hash,
            search,
            headers: Object.assign(Object.assign({}, options === null || options === void 0 ? void 0 : options.headers), ((options === null || options === void 0 ? void 0 : options.body) && {
                "Content-Length": Buffer.byteLength(options.body),
            })),
            method: (_a = options === null || options === void 0 ? void 0 : options.oddMethod) !== null && _a !== void 0 ? _a : options === null || options === void 0 ? void 0 : options.method,
        }, (res) => {
            let data = "";
            res.on("data", (chunk) => (data += String(chunk)));
            res.on("close", () => resolve({
                data,
                headers: res.headers,
                statusCode: res.statusCode,
            }));
            res.on("error", (err) => reject(err));
        });
        (options === null || options === void 0 ? void 0 : options.body) && req.write(options.body);
        req.on("error", (err) => reject(err));
        req.end();
    });
};
exports.default = vegot;
