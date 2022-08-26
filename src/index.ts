import Http, { IncomingHttpHeaders, OutgoingHttpHeaders } from "http"
import Https from "https"
import { URL } from "url"

namespace VegotTypes {
  export interface RequestResponse {
    data: string
    statusCode?: number
    headers: IncomingHttpHeaders
  }

  export interface RequestOptions {
    headers?: OutgoingHttpHeaders
    body?: any
    method?: Methods
    oddMethod?: string
  }

  export type Methods =
    | "GET"
    | "HEAD"
    | "POST"
    | "PUT"
    | "DELETE"
    | "OPTIONS"
    | "TRACE"
    | "PATCH"
    | "CONNECT"
}

const vegot = (
  url: string,
  options?: VegotTypes.RequestOptions
): Promise<VegotTypes.RequestResponse> => {
  return new Promise((resolve, reject) => {
    const { hostname, pathname, protocol, port, hash, search } = new URL(url)

    options?.headers && delete options.headers["Content-Length"]

    const req = (protocol === "https:" ? Https.request : Http.request)(
      {
        hostname,
        path: pathname,
        port,
        hash,
        search,
        headers: {
          ...options?.headers,
          ...(options?.body && {
            "Content-Length": Buffer.byteLength(options.body),
          }),
        },
        method: options?.oddMethod ?? options?.method,
      },
      (res) => {
        let data = ""

        res.on("data", (chunk) => (data += String(chunk)))
        res.on("close", () =>
          resolve({
            data,
            headers: res.headers,
            statusCode: res.statusCode,
          })
        )
        res.on("error", (err) => reject(err))
      }
    )

    options?.body && req.write(options.body)

    req.on("error", (err) => reject(err))

    req.end()
  })
}

export default vegot
