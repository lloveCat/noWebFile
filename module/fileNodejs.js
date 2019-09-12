var fs = require('fs');
//成功： err:null, data：文本数据
//失败： err:错误对象， data: null
fs.readFile('./staticTxt/read.txt', function (err, data) {
    if (err) console.log('read read.txt failed ！')
    else console.log(data.toString());
});

fs.readFile('./staticTxt/read1.txt', function (err, data) {
    if (err) console.log('read read1.txt failed ！')
    else console.log(data.toString());
});

//成功： err:null
//失败： err:失败对象
fs.writeFile('./staticTxt/write.txt', '我是写入的内容', function (err) {
    if (err) console.log('write write.txt failed !')
    else console.log('write success !')
})