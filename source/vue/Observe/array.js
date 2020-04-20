// ['push','shift','unshift','pop','reverse','sort','splice']

// 获取数组原型上的方法
let oldArrayProtoMethods = Array.prototype

// 复制一份 然后改成新的
export let arrayMethods = Object.create(oldArrayProtoMethods)

// methods 修改
let methods = ['push','shift','unshift','pop','reverse','sort','splice']

methods.forEach(method => {
  arrayMethods[method] = function(...args){
    // 不光要返回新的数组方法  还要执行监听
    let res = oldArrayProtoMethods[method].apply(this, args)
    // 实现新增属性的监听 
    console.log('实现监听数组属性的变化')    
    return res
  }
});
