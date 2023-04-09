const assert = require("node:assert")
const { test } = require("node:test")
const vegot = require("vegot").default

test("Method", async (t) => {
  await t.test("it should be GET", async () => {
    const res = await vegot("https://httpbin.org/anything")
    const json = JSON.parse(res.data)
    assert.equal(json.method, "GET")
  })

  await t.test("it should be POST", async () => {
    const res = await vegot("https://httpbin.org/anything", { method: "POST" })
    const json = JSON.parse(res.data)
    assert.equal(json.method, "POST")
  })
})

test("Headers", async (t) => {
  const random = Math.random().toString()
  await t.test(
    `they should include MyHeader and its value should be ${random}`,
    async () => {
      const headerKey = "Myheader"
      const res = await vegot("https://httpbin.org/anything", {
        headers: {
          [headerKey]: random,
        },
      })
      const json = JSON.parse(res.data)
      assert.equal(json.headers[headerKey], random)
    }
  )
})

test("Body", async (t) => {
  const random = Math.random().toString()

  await t.test(`it should be ${random}`, async () => {
    const res = await vegot("https://httpbin.org/anything", {
      body: random,
      method: "POST",
    })
    const json = JSON.parse(res.data)
    assert.equal(json.data, random)
  })
})
