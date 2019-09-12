var assert = require('assert')
//assert内核模块用于断言操作，assert.AssertionError为断言失败抛出的异常

// var { message } = new assert.AssertionError({
//     actual: 1,
//     expected: 2,
//     operator: 'strictEqual',
//     message: 'not equal'
// })
// console.log('myMessage:', message)

try {
    assert(true) //断言表达式为真
    var o1 = {}
    var o2 = {}
    // console.log(o1 == o2)
    // assert.equal(o1,o2)     //非严格模式一般匹配, 相当于==，主要是值相等
    assert.deepEqual(o1, o2)  //非严格深度匹配
    assert.throws( () => {  //判断throw抛出的错误是否与第二个参数error对象匹配
        throw new TypeError('type error')
    }, {
        name: 'TypeError',
        message: 'type error'
    })
    // assert.strictEqual(1, '1')    //严格模式一般匹配,相当于 ===
} catch (err) {
    console.log('error message', err)
}


