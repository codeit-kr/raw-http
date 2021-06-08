import got, { Method } from "got"
import { Request } from "./Request"
import { Response } from "./Response"

export class RawHttpClient {
  private requests: Request[]

  constructor(rawRequestsText: string) {
    const rawRequests = rawRequestsText.split("###\n").map(r => r.trim())
    this.requests = rawRequests.map(rawRequest => new Request(rawRequest))
  }

  async execute() {
    const rawResponses = []
    for (const request of this.requests) {
      const response = await RawHttpClient.send(request)
      const rawResponse = new Response(response)
      rawResponses.push(rawResponse)
    }
  
    return rawResponses
  }

  private static send(request: Request) {
    const { method, url, headers, body } = request
    return got(url, {
      method: method as Method,
      headers: headers,
      body: body,
      resolveBodyOnly: false,
    })
  }
}
