module.exports = ServerFactory => class Http2ServerFactory extends ServerFactory {
  create (options) {
    const fs = require('fs')
    const http2 = require('http2-75lb')
    const serverOptions = {}
    if (options.pfx) {
      serverOptions.pfx = fs.readFileSync(options.pfx)
    } else {
      if (!(options.key && options.cert)) {
        serverOptions.key = this.getDefaultKeyPath()
        serverOptions.cert = this.getDefaultCertPath()
      }
      serverOptions.key = fs.readFileSync(serverOptions.key, 'utf8')
      serverOptions.cert = fs.readFileSync(serverOptions.cert, 'utf8')
    }
    this.view.write('server.config', serverOptions)
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
