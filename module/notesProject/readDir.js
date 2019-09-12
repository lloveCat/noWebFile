var fs = require('fs')
var http = require('http')
var art = require('art-template')   //加载模板引擎art模块
var retString = art.render('hello {{name}}', {      //render方法，使用第二个参数对象替换第一个参数art格式字符串
    name: 'jack'
})
console.log(retString)
//展示某文件夹的文件列表
var server = http.createServer()        //http server对象继承自net server
server.on('request', function (req, resp) {
    //1.简单粗暴的方法：在html中添加一个特殊标记，读取文件后替换特殊标价成指定的html内容
    //2.使用模板引擎进行替换html内容，如art-template模板引擎
    fs.readFile('./resources/fileDir.html', function (err, data) {
        if (err) return resp.end(JSON.stringify({status: 404, message: 'error request'}))
        data = data.toString()
        fs.readdir('./resources', function (err, files) {
            if (err) {
                return resp.end(JSON.stringify({status: 404, message: 'Can\'t find resources dir'}))
            }
            //使用${}来添加到``字符串中(es6格式)
            console.log(files)
            //1 ： 简单粗暴的方法：在html中添加一个特殊标记，读取文件后替换特殊标价成指定的html内容
            // var trString = ``
            // files.forEach(function (file) {
            //     trString += `<tr>
            //                 <td>${file}</td>
            //              </tr>
            //             `
            // })
            // console.log(trString)
            // data = data.replace('-_-', trString)
            //2 ： 使用模板引擎进行替换html字符串内容，如art-template模板引擎
            data = art.render(data, {
                files: files,
                name: 'laihuihui',
                age: 22
            })
            console.log(data)

            return resp.end(data)
        })
    })

})
server.listen(5000, function () {
    console.log('readDir server is running')
})
