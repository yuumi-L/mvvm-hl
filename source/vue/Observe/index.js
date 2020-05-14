import Observe from './observe'
import Watcher from './watcher'
import Dep from './dep'


export function initState(vm) {
  let opts = vm.$options
  if (opts.data) {
    initData(vm)
  }
  if (opts.computed) {
    initComputed(vm, opts.computed)
  }
  if (opts.watch) {
    initWatch(vm)
  }
}

function proxy(vm, source, key) {
  Object.defineProperty(vm, key, {
    get() {
      return vm[source][key]
    },
    set(newValue) {
      return vm[source][key] = newValue
    }
  })
}

function initData(vm) {
  // 获取用户传入的data
  let data = vm.$options.data
  // 判断是不是函数  把数据赋值给_data 方便观察
  data = vm._data = typeof data === 'function' ? data.call(vm) : data || {}
  // 其实是vm._data 代理了 vm 的操作
  for (let key in data) {
    proxy(vm, "_data", key)
  }
  // 监听数据
  observe(data)
}

export function observe(data) {
  // 判断是不是对象
  if (typeof data !== 'object' || data == null) {
    return
  }
  if (data.__ob__) {
    return data.__ob__
  }
  return new Observe(data) // 观察数据的业务逻辑
}
function createComputedGetter(vm, key) {
  let watcher = vm._watcherComputed[key]
  return function () {
    if (watcher) {
      if (watcher.dirty) {
        // 页面取值的时候 dirty如果是true的话就调用get方法计算
        watcher.evalValue()
      }
      if (Dep.target) {
        watcher.depend()
      }
      return watcher.value
    }
  }
}
function initComputed(vm, computed) {
  // 计算属性是有缓存的
  let watchers = vm._watcherComputed = Object.create(null)
  for (let key in computed) {
    let userDef = computed[key]
    watchers[key] = new Watcher(vm, userDef, () => { }, {
      lazy: true
    })
    // 当用户取值的时候， 将key定义到vm上
    Object.defineProperty(vm, key, {
      get: createComputedGetter(vm, key)
    })
  }
}

function initWatch(vm) {
  let watch = vm.$options.watch // 是个{}
  for (let key in watch) {
    let handler = watch[key]
    createWatch(vm, key, handler)
  }
}
function createWatch(vm, key, handler) {
  return vm.$watch(key, handler)
}