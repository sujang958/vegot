/// <reference types="node" />
import { IncomingHttpHeaders, OutgoingHttpHeaders } from "http";
declare namespace VegotTypes {
    interface RequestResponse {
        data: string;
        statusCode?: number;
        headers: IncomingHttpHeaders;
    }
    interface RequestOptions {
        headers?: OutgoingHttpHeaders;
        body?: any;
        method?: Methods;
        oddMethod?: string;
    }
    type Methods = "GET" | "HEAD" | "POST" | "PUT" | "DELETE" | "OPTIONS" | "TRACE" | "PATCH" | "CONNECT";
}
declare const vegot: (url: string, options?: VegotTypes.RequestOptions) => Promise<VegotTypes.RequestResponse>;
export default vegot;
