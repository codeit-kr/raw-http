# raw-http

Send HTTP request and get response.

## Features

* Send HTTP request and get response
* Send multiple requests sequentially in the same file (separated by `###` delimiter)
* Comments support (line starts with `#`)

## Install

```sh
npm install @codeit-com/raw-http
```

## Usage

Follow the standard [RFC2616](https://www.w3.org/Protocols/rfc2616/rfc2616-sec5.html) that including request method, uri, headers, and body.

```js
const { RawHttpClient } = require("@codeit-com/raw-http")

const httpRequest = `
POST https://jsonplaceholder.typicode.com/posts HTTP/1.1
Content-type: application/json; charset=UTF-8

{
  title: 'foo',
  body: 'bar',
  userId: 1,
}
`
const client = new RawHttpClient({ beautify: true })
client.requestAll(httpRequest).then(responses => {
  console.log(responses[0])
})

// HTTP/1.1 201 Created
// Date: Wed, 09 Jun 2021 01:22:56 GMT
// ...
// 
// {
//   id: 101,
//   title: 'foo',
//   body: 'bar',
//   userId: 1
// }
```

## API

### `new RawHttpClient(options?: RawHttpClient.Options)`

Create a RawHttpClient instance. 

#### Options

- `beautify: boolean`: Beautify response body if it's JSON. Default is false.

### `.requestAll(rawRequestsText: string): string[]`

Execute all requests in `rawRequestsText` and return raw responses.

## License
[MIT](https://choosealicense.com/licenses/mit/)
