var a = 2;
var myModule = require('./myModule')
var mm = new myModule();    //myModule返回的是MyModule()函数，实际是一个构造方法
console.log('mm.add: ' ,mm.add(1,2));
console.log('mm.mul: ' ,mm.mul());
// console.log(myModule.add(1,2))
// console.log(myModule.mul())
console.log('a: ' ,a)



function A() {
    this.a = 2;
}
A.prototype.add = function (num1, num2) {
    return num1 + num2
}
A.prototype.b = 3;
var myA = new A();
//new的过程：
// 1.var object = new NativeObject();
// 2.object.__proto__ = A.prototype
// 3.object.class = Object-创建对象类型
// 4.A.call(object[,params])<==> object.mm = A;  object.mm(params);  this.a = 2<==>object.a = 2
//最终返回object对象，通过原型__proto__引用A.prototype属性，A中this.xxx属性最终都属于object
//object.a查找顺序： object.a -> object.__proto__a
var myAA = new A();
console.log('myA: ' + myA.a + '    ' + myA.b + '   ' + myA.add(1,2) + '   ' + A.prototype.add(2,3));
var ooo = Object.create(myA);
console.log('ooo:' + ooo.__proto__.add(1,2) + ooo.__proto__.b)
console.log('ooo:' + ooo + '   ' + ooo.a + '     ' + ooo.b + '   '  + ooo.add(1,2));
ooo.b = 5;
console.log('b:' + myA.b + '   '  + ooo.b + '   ' + myAA.b)
myA.b = 4;  //想要修改prototype的值，这种方法行不通，会给对象添加一个b属性成员
console.log('试图修改原型属性b的值： ' + myA.b === myA.__proto__.b);
console.log('myA.__proto__.b:' + myA.__proto__.b);
console.log('b:' + myA.b + '   '  + ooo.b + '   ' + myAA.b)
A.prototype.b = 6;      //使用类原型对象A.prototype.b或myA.__proto__.b访问原型对象中的属性
console.log('b:' + myA.b + '   '  + ooo.b + '   ' + myAA.b)
function B() {
    A.call(this)
}
var myB = new B();

var { add, mul } = new myModule()       //使用这种方式定义对象，{}为new myModule构造的对象，add,mul为myModule对象的属性引用。可以通过add,mul访问对象的同名属性
console.log('lastAdd ' + add(2,3) + ' lastMul ' + mul())    //lastAdd 5 lastMul mul
// console.log(myB.a + '    ' + myB.add(2,3))   //call不继承A原型prototype