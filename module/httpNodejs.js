var http = require('http');
var server = http.createServer()
server.on('request', function (req,rsp) {  //http服务器接收request事件后，触发回调处理事件.携带两个参数：resquest,response
    console.log('receive from client\'s request, requestPath: ' + req.url)  // 以/开头的路径
    console.log('request ip and port:' + req.socket.remoteAddress, req.socket.remotePort)
    var responseTxt = '';
    switch (req.url) {
        case '/':
            responseTxt = 'index ： 首页'
            break;
        case '/login':
            responseTxt = 'login : 登录'
            break;
        case 'register':
            responseTxt = 'register ： 注册'
            break
        default:
            responseTxt = {
                status: 404,
                message: '请求非法'
            }
            break;
    }
    // rsp.setHeader('Content-Type', 'text/plain; charset=utf-8')   //告知客户端，返回内容以普通文本渲染
    // rsp.write('' + responseTxt)     //rsp.write(JSON.stringify(responseTxt)),返回值只能是字符串,默认编码utf8
    rsp.end(JSON.stringify(responseTxt));         //需要调用end来完成响应
    //rsp.end(responseTxt)  //响应并结束
})
server.listen(3000, function () {
    console.log('server start,listen 3000 port');
});    //监听3000端口号.本地访问localhost:3000