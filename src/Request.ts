import { IncomingHttpHeaders } from "http"

enum ParsePhase {
  StartLine,
  Header,
  Body,
}

export class Request {
  method: string
  url: string
  headers: IncomingHttpHeaders
  body?: string

  constructor(properties: { [P in keyof Request]: Request[P] }) {
    const { method, url, headers, body } = properties
    this.method = method
    this.url = url
    this.headers = headers
    this.body = body
  }
  static parse(rawRequest: string) {
    const lines = rawRequest.split('\n')

    let startLine: string = ""
    const headersLines: string[] = []
    let bodyLines: string[] = []

    let phase = ParsePhase.StartLine
    let currentLine: string | undefined
    while ((currentLine = lines.shift()) !== undefined) {
      if (currentLine.trim().startsWith("#")) {
        continue
      }

      const nextLine: string | undefined = lines[0]
      switch (phase) {
        case ParsePhase.StartLine:
          startLine = currentLine.trim()
          if (nextLine === undefined) {
            // phase = ParsePhase.Request
          } else if (nextLine.trim()) {
            phase = ParsePhase.Header
          } else {
            lines.shift()
            phase = ParsePhase.Body
          }
          break;

        case ParsePhase.Header:
          headersLines.push(currentLine.trim())
          if (nextLine?.trim() === "") {
            lines.shift()
            phase = ParsePhase.Body
          }
          break;
      
        case ParsePhase.Body:
          bodyLines.push(currentLine)
          break;
      }
    }

    let { method, url } = parseStartLine(startLine)
    const headers = parseHeaders(headersLines, url)
    const body = parseBody(bodyLines)

    removeHeader(headers, "content-length")

    const host = getHeader(headers, "host")
    if (host && url.startsWith("/")) {
      const port = (host as string).split(":")[1]
      const protocol = ["443", "8443"].includes(port) ? "https" : "http"
      url = `${protocol}://${host}${url}`
    }

    return new Request({ method, url, headers, body })
  }

}

const parseStartLine = (line: string) => {
  const [method, url] = line.split(" ")
  return { method, url }
}

const parseHeaders = (lines: string[], url: string) => {
  const headers: IncomingHttpHeaders = {}
  lines.forEach(line => {
    const [name, value = ""] = line.split(/:(.+)/)
    headers[name.toLowerCase()] = value.trim()
  })

  if (!url.startsWith("/")) {
    removeHeader(headers, "host")
  }

  return headers
}

const parseBody = (lines: string[]) => {
  return (lines.length === 0) ? undefined : lines.join("\n")
}

const getHeader = (headers: IncomingHttpHeaders, name: string) => {
  return headers[name]
}

const removeHeader = (headers: IncomingHttpHeaders, name: string) => {
  delete headers[name]
}