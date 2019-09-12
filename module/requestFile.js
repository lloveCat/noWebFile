var fs = require('fs')
var http = require('http')

var server = http.createServer();

server.on('request', function (req, resp) {
    console.log('request.url: ' + req.url)
    if (req.url === '/') {
        fs.readFile('./resources/index.html', function (err, data) {
            if (err) console.log(err)
            else {
                resp.end(data.toString())
            }
        })
    }
})

server.listen(3000, function () {
    console.log('server is running ...')
})