import observe from './index'
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

    // 拿到新增属性
    let inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args        
        break;
      case 'splice':
        inserted = args.slice(2)
      default:
        break;
    }
    // 实现新增属性的监听 
    if(inserted) observerArray(inserted)
    // 通知视图更新
    // todo
    console.log('实现监听数组属性的变化')    
    return res
  }
});

function observerArray(inserted){
  // 循环新增数组中每一个属性进行监听
  for (let i = 0; i < inserted.length; i++) {
    (inserted[i])
  }
}
