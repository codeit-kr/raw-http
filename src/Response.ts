import { Response as GotResponse } from "got"

export class Response {
  raw: string

  constructor(gotResponse: GotResponse<string>) {
    const { httpVersion, statusCode, rawHeaders, body } = gotResponse
    const startLine = `HTTP/${httpVersion} ${statusCode}`
    const headers = stringifyResponseHeaders(rawHeaders)

    this.raw = `${startLine}\n${headers}\n${body}`
  }
}

const stringifyResponseHeaders = (headers: string[]) => {
  let rawHeaders = ""
  while (headers.length !== 0) {
    const name = headers.shift()
    const value = headers.shift()
    rawHeaders += `${name}: ${value}\n`
  }
  return rawHeaders
}
