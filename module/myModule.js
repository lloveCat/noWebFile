console.log('I am myModule')
function add(num1, num2) {
    return num1 + num2;
}
function mul() {
    return 'mul'
}
function MyModule() {
    this.add = add;
    this.mul = mul;
}
// console.log(a); //虽然在引用文件处创建了a，但执行时还是报错：变量无全局概念，只有文件概念
// exports = MyModule; //error,直接复制不能影响module.exports
// exports.add = add;   //true,相当于module.exports.add = add
// exports.mul = mul;   //true,相当于module.exports.mul = mul
module.exports = MyModule;  //对象直接赋值:module.exports,true
//exports = module.exports, exports是全局对象，指向当前加载模块module.exports属性
//不能直接给exports赋值如 exports = {}, 改变exports指向对象，则无法映射到module.exports，造成无法暴露接口