import observe from './index'
// ['push','shift','unshift','pop','reverse','sort','splice']

// 获取数组原型上的方法
let oldArrayProtoMethods = Array.prototype

// 复制一份 然后改成新的
export let arrayMethods = Object.create(oldArrayProtoMethods)

// methods 修改
let methods = ['push', 'shift', 'unshift', 'pop', 'reverse', 'sort', 'splice']

methods.forEach(method => {
  arrayMethods[method] = function (...args) {
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
    if (inserted) observerArray(inserted)
    // 通知视图更新
    this.__ob__.dep.notify()
    console.log('实现监听数组属性的变化')
    return res
  }
});

function observerArray(inserted) {
  // 循环新增数组中每一个属性进行监听
  for (let i = 0; i < inserted.length; i++) {
    (inserted[i])
  }
}
// 递归收集依赖
export function dependArray(value) {
  for (let i = 0; i < value.length; i++) {
    let currentItem = value[i]
    currentItem.__ob__ && currentItem.__ob__.dep.depend()
    if (Array.isArray(currentItem)) {
      dependArray(currentItem) // 递归收集多维数组
    }
  }
}
