const assert = require("node:assert")
const { test } = require("node:test")
const vegot = require("../lib/index").default

test("Method", async (t) => {
  await t.test("It should be GET", () => {
    vegot("https://httpbin.org/anything", { method: "GET" }).then(
      ({ data }) => {
        const res = JSON.parse(data)
        assert.equal(res.method, "GET")
      }
    )
  })

  await t.test("It should be POST", () => {
    vegot("https://httpbin.org/anything", { method: "POST" }).then(
      ({ data }) => {
        const res = JSON.parse(data)
        assert.equal(res.method, "POST")
      }
    )
  })
})

test("Headers", async (t) => {
  await t.test("They should include MyHeader", () => {
    vegot("https://httpbin.org/anything", {
      headers: {
        MyHeader: "MyHeader",
      },
    }).then(({ data }) => {
      const res = JSON.parse(data)
      assert.equal(res.headers.MyHeader, "MyHeader")
    })
  })
})
