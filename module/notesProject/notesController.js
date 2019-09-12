var http = require('http')
var fs = require('fs')
var mysql = require('mysql')
var querystring = require('querystring')
var art = require('art-template')
var urll = require('url')    //用于解析get方式的请求路径中的参数

var dbPool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'l914119972',
    database: 'notedb',
    dateStrings: true   //数据库返回时间类型数据时，强转成string类型。这里不加数据库返回数据为utc格式时间
})

//随即使用的数据库连接配置
// var dataConfig = {
//     host: 'localhost',
//     user: 'root',
//     password: 'l914119972',
//     database: 'notedb',
//     dateStrings: true   //数据库返回时间类型数据时，强转成string类型。这里不加数据库返回数据为utc格式时间
// }

//url使用解析get请求路径参数
// var param = urll.parse('/html/index.html?name=%E8%B5%96%E6%99%96%E6%99%96&age=23', true)
// console.log(param)

// var httpServer =
http.createServer(function (req, resp) {
    var url = urll.parse(req.url, true)     //第二个参数解析query字符串为对象，即路径后的?a=2...部分
    var pathname = url.pathname

    if (pathname.endsWith('.html') || pathname.endsWith('.js') || pathname.endsWith('.css') || pathname === '/') {
        if (pathname === '/') {
            pathname = '/index.html'
        }
        console.log(pathname)
        redirect(pathname, resp)
    } else {
        switch (pathname) {
            case '/doAddNote' :
                var postObject = url.query
                console.log(postObject.name, postObject.noteTxt)
                insertNote(postObject.name, postObject.noteTxt, resp)
                break;
            default:
                resp.end(JSON.stringify({status: 404, message: '非法访问'}))
        }
    }
}).listen(3000, function () {
    console.log('Notes server is running ...')
})

function redirect(filePath, resp) {
    var realPath = './resources' + filePath;

    fs.readFile(realPath, function (err, data) {
        if (err) {
            console.log(err)
            return resp.end(JSON.stringify({status: 404, message: '访问无效资源'}))
        }
        if ( filePath === '/index.html' ) {
            getAllNotes(1, resp, data.toString())
        } else {
            resp.end(data.toString())
        }
    })
}

function getAllNotes(page, resp, data) {
    // var connection = mysql.createConnection(dataConfig)
    // connection.connect();
    dbPool.getConnection(function (err, connection) {
        var sqlString = 'SELECT * FROM NOTELIST LIMIT ' + (page - 1) * 50 + ',' + page * 50;
        console.log(sqlString)
        connection.query(sqlString,function (error, result, fields) {
            if (error) {
                console.log(error)
                resp.end(data)
            }
            data = art.render(data, {
                noteList : result
            })
            //响应重定向内容：status:302,告诉浏览器，重定向至index.html
            // resp.statusCode = 302
            // resp.setHeader('Location', '/')
            resp.end(data)
        })
        connection.release()
    })
    // connection.query(sqlString,function (error, result, fields) {
    //     if (error) {
    //         console.log(error)
    //         resp.end(data)
    //     }
    //     data = art.render(data, {
    //         noteList : result
    //     })
    //     resp.end(data)
    // })
    // connection.end()
}

function insertNote(userName, noteTxt, resp) {
    // var connection = mysql.createConnection(dataConfig)
    // connection.connect(function (err, result) {
    //     if (err) console.log('database connect err: ', err)
    // })
    var date = new Date()
    var params = new Array()
    params.push(userName)
    params.push(noteTxt)
    params.push(date)
    dbPool.getConnection(function (err, connection) {
        var sqlString = 'INSERT INTO NOTELIST(note_username, note_txt, note_time)  VALUES(?,?,?)'
        console.log(sqlString)

        connection.query(sqlString, params, function (err, result, fileds) {
            if (err || result.affectedRows === 0)
            {
                console.log(err)
                resp.end(JSON.stringify({status: 404, message: '留言失败'}))
            } else {
                if (result.affectedRows > 0) {
                    resp.end(JSON.stringify({status: 1, message: '留言成功，返回首页即可查看'}))
                }
            }
        })
        connection.release()
    })
}

//一行代码以(,[,`三者开头时，前面需要添加';'：
// var a = 2;  //需要加分号
// (function () {   //这一行以(开头
//     return 'abc'
// })
//es6中使用``反引号表示字符串
// var foo = `abc
// edf
// dfs`
//相当于html中的pre标签，但开头使用时也应该使用;
// ;`abc`.toString() //避免前面有代码，影响执行结果