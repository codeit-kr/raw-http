import got, { Method } from "got"
import { Request } from "./Request"
import { Response } from "./Response"

export class RawHttpClient {
  private rawRequestsText: string

  constructor(rawRequestsText: string) {
    this.rawRequestsText = rawRequestsText
  }

  async requestAll() {
    const rawRequests = this.rawRequestsText.split("###\n").map(r => r.trim())
    const requests = rawRequests.map(Request.parse)

    const rawResponses = []
    for (const request of requests) {
      const response = await this.request(request)
      const rawResponse = Response.toRaw(response)
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
    })
  }
}
