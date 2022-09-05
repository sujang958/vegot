# vegot

Promise-based, Lightweight, and Zero-Dependency Http Client

## Installing

Using npm:

```sh
$ npm install vegot
```

Using yarn:

```sh
$ yarn add vegot
```

## Importing

```js
const vegot = require("vegot").default
```

or

```ts
import vegot from "vegot"
```

## Examples

_Send a GET request_

```js
vegot("https://httpbin.org/anything").then((res) => {
  console.log(res)
})
```

_Send a POST request_

```js
vegot("https://httpbin.org/anything", { method: "POST" }).then((res) => {
  console.log(res)
})
```

<br />

## License

The package is licensed under the MIT License
