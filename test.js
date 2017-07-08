'use strict'
const TestRunner = require('test-runner')
const Https2Server = require('./')
const Lws = require('lws')
const runner = new TestRunner()

runner.test('basic', function () {
  const lws = new Lws()
  const server = lws.listen({ server: '.' })
  server.close()
})
