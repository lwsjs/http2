module.exports = ServerFactory => class Http2ServerFactory extends ServerFactory {
  create (options) {
    const fs = require('fs')
    const http2 = require('http2-75lb')
    const t = require('typical')
    const serverOptions = {}
    if (options.pfx) {
      serverOptions.pfx = fs.readFileSync(options.pfx)
    } else {
      if (options.key && options.cert) {
        serverOptions.key = fs.readFileSync(options.key)
        serverOptions.cert = fs.readFileSync(options.cert)
      } else {
        serverOptions.key = fs.readFileSync(this.getDefaultKeyPath())
        serverOptions.cert = fs.readFileSync(this.getDefaultCertPath())
      }
    }
    if (t.isDefined(options.maxConnections)) serverOptions.maxConnections = options.maxConnections
    if (t.isDefined(options.keepAliveTimeout)) serverOptions.keepAliveTimeout = options.keepAliveTimeout
    this.emit('verbose', 'server.config', serverOptions)
    return http2.createServer(serverOptions)
  }
}

function doPush (res, url, filename, type = 'application/javascript') {
  const push = res.push(url)
  push.writeHead(200, {
    'content-type': type
  })
  const fs = require('fs')
  fs.createReadStream(filename).pipe(push)
}
