# raw-http

Send HTTP request and get response.

## Features

* Send HTTP request and get response
* Send multiple requests sequentially in the same file (separated by `###` delimiter)
* Comments support (line starts with #)

## Install

```sh
npm install @codeit-com/raw-http
```

## Usage

Follow the standard [RFC2616](https://www.w3.org/Protocols/rfc2616/rfc2616-sec5.html) that including request method, uri, headers, and body.

```js
const { RawHttpClient } = require("@codeit-com/raw-http")

const httpRequest = `
POST https://example.com/comments HTTP/1.1
Content-type: application/json; charset=UTF-8

{
  "content": "Hello",
  "userId": 1
}
`
const client = new RawHttpClient(httpRequest)
client.requestAll().then(responses => {
  console.log(responses[0])
})

// HTTP/1.1 200 OK
// Date: Wed, 09 Jun 2021 01:22:56 GMT
// Connection: keep-alive
// Keep-Alive: timeout=5
// Transfer-Encoding: chunked
```

## License
[MIT](https://choosealicense.com/licenses/mit/)
