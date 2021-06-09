import { Response as GotResponse } from "got"

export class Response {
  static toRaw(gotResponse: GotResponse<string>) {
    const { httpVersion, statusCode, rawHeaders, body } = gotResponse
    const startLine = `HTTP/${httpVersion} ${statusCode}`
    const headers = Response.buildResponseHeaders(rawHeaders)

    return `${startLine}\n${headers}\n${body}`
  }

  private static buildResponseHeaders(headers: string[]) {
    let rawHeaders = ""
    while (headers.length !== 0) {
      const name = headers.shift()
      const value = headers.shift()
      rawHeaders += `${name}: ${value}\n`
    }
    return rawHeaders
  }
}
