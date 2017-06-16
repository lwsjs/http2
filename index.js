module.exports = ServerFactory => class Http2ServerFactory extends ServerFactory {
  create (options) {
    const fs = require('fs')
    const https = require('http2')
    if (options.pfx) {
      options.pfx = fs.readFileSync(options.pfx)
    } else {
      if (!(options.key && options.cert)) {
        options.key = this.getDefaultKeyPath()
        options.cert = this.getDefaultCertPath()
      }
      options.key = fs.readFileSync(options.key)
      options.cert = fs.readFileSync(options.cert)
    }
    return https.createServer(options)
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
