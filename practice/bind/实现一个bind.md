```js
Function.prototype.myBind = function (thisArg, ...args) {
  if (!thisArg) thisArg = window
  let paramsList = args
  const func = this
  function newFunc (...newArgs) {
    paramsList = paramsList.concat(newArgs)
    // 在ES6中，引入了一个新的元属性new.target，它允许函数内部确定是否通过new关键字被调用。
    // 如果函数是通过new调用的，new.target会指向该函数本身；
    // 如果不是，new.target的值会是undefined。
    const context = new.target ? this : thisArg
    return func.apply(context, paramsList)
  }
  // 使用new 方式时需要继承相关原型链
  newFunc.prototype = func.prototype
  return newFunc
}
```