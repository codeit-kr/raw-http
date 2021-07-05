import got, { Method } from "got"
import { Request } from "./Request"
import { Response } from "./Response"

export namespace RawHttpClient {
  export interface Options {
    beautify: boolean
  }
}
export class RawHttpClient {
  private options: RawHttpClient.Options

  constructor(options: RawHttpClient.Options = { beautify: false }) {
    this.options = options
  }

  async requestAll(rawRequestsText: string) {
    const rawRequests = rawRequestsText.split("###\n").map(r => r.trim())
    const requests = rawRequests.map(Request.parse)

    const rawResponses = []
    for (const request of requests) {
      const response = await this.request(request)
      const rawResponse = Response.toRaw(response, { beautify: this.options.beautify })
      rawResponses.push(rawResponse)
    }
  
    return rawResponses
  }

  private request(request: Request) {
    const { method, url, headers, body } = request
    return got(url, {
      method: method as Method,
      headers: headers,
      body: body,
      resolveBodyOnly: false,
      throwHttpErrors: false,
    })
  }
}
