import { observe } from './index'
import { arrayMethods, dependArray } from './array'
import Dep from './dep'

class Observe {
  constructor(data) { // data 就是vue里面定义的数据 vm._data
    // 实现监听  将用户的数据使用Object.defineProperty 定义
    // 创建数组专用的dep
    this.dep = new Dep()

    // 给每个对象包括数组添加一个属性，__ob__
    Object.defineProperty(data, '__ob__', {
      get: () => this
    })
    if (Array.isArray(data)) {
      data.__proto__ = arrayMethods
    } else {
      this.walk(data)
    }
  }

  walk(data) {
    let keys = Object.keys(data)

    for (let i = 0; i < keys.length; i++) {
      let key = keys[i]  // 所有的key
      let value = data[keys[i]] // 所有的value
      defineReactive(data, key, value)
    }
  }
}

export function defineReactive(data, key, value) {
  // 观察value 是不是一个对象然后监听  如果是一个对象就递归监听
  let childOb = observe(value) // 如果是对象会递归调用observe
  // console.log('=========================================STARD')
  // console.log(data)
  // console.log(childOb)
  // console.log(key)
  // console.log(value)
  // console.log('=========================================END')
  let dep = new Dep()
  Object.defineProperty(data, key, {
    get() {
      console.log('获取数据')
      if (Dep.target) {
        // 在watcher里面记录dep 也要在dep中记录watcher        
        dep.depend()
        // dep.addSub(watcher)

        if (childOb) {
          childOb.dep.depend()  // 数组收集当前渲染的watcher
          dependArray(value) //收集儿子的依赖
        }
      }
      return value
    },
    set(newValue) {
      console.log('设置数据')
      if (newValue === value) {
        return
      }
      // 可能在设置的时候是一个对象
      observe(newValue)
      value = newValue

      // 当属性设置的时候 实现更新
      dep.notify()
    }
  })
}

export default Observe