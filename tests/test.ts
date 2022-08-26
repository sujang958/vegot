import assert from "node:assert"
import test from "node:test"
import vegot from "../src/index"

test("Testing Methods", () => {
  vegot("https://httpbin.org/anything", { method: "GET" }).then(({ data }) => {
    const res = JSON.parse(data)
    assert.equal(res.method, "GET")
  })
})
