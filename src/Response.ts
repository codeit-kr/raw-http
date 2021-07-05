import { Response as GotResponse } from "got"

export class Response {
  static toRaw(gotResponse: GotResponse<string>, options: { beautify: boolean } = { beautify: false }) {
    const { httpVersion, statusCode, statusMessage, rawHeaders, body } = gotResponse

    const startLine = `HTTP/${httpVersion} ${statusCode} ${statusMessage}`
    const headers = buildResponseHeaders(rawHeaders)
    let processedBody = options.beautify ? beautifyBody(body) : body

    return `${startLine}\n${headers}\n${processedBody}`
  }
}

const buildResponseHeaders = (headers: string[]) => {
  let rawHeaders = ""
  while (headers.length !== 0) {
    const name = headers.shift()
    const value = headers.shift()
    rawHeaders += `${name}: ${value}\n`
  }
  return rawHeaders
}

const beautifyBody = (body: string) => {
  try {
    const parsed = JSON.parse(body)
    return JSON.stringify(parsed, null, 2)
  } catch {
    return body
  }
}
