var mysql = require('mysql')

// 1.普通连接方式，数据库连接随用随连
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'l914119972',
    database: 'notedb',
    dateStrings: true
})
connection.connect(function (err, result) {
    if (err) console.log(err)
    else {
        //connection.query(sqlString, callback)
        connection.query('SELECT * FROM NOTELIST', function (err, result, fields) {
            if (err) console.log(err)
            else {
                console.log('NOTELIST ALL: ', result)
                console.log(fields)
            }
        })
        //connection.query(sqlString, values, callback)
        connection.query('SELECT * FROM NOTELIST WHERE NOTE_ID = ?', [10], function (err, result, fields) {
            if (err) console.log(err)
            else {
                console.log('NOTELIST ALL(+ where): ', result)
                console.log(fields)
            }
        })
        connection.end() //connection.destroy()
    }
})

//2,线程池方式，数据库开启线程池连接，每次使用从连接池中获取连接对象
var connectionPool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'l914119972',
    database: 'notedb',
    dateStrings: true   //数据库返回时间类型数据时，强转成string类型。这里不加数据库返回数据为utc格式时间
})

connectionPool.getConnection(function (err, connection) {
    if (err) console.log(err)
    else {
        //connection.query(options, callback)
        connection.query({
            sql: 'SELECT COUNT(*) FROM NOTELIST',
            timeout: 30000,
            values: null
        }, function (err, result, fields) {
            if (err) console.log(err)
            else {
                console.log('NOTELIST count: ',result)
                console.log(fields)
            }
            connection.release()
        })
    }
})
connectionPool.end()