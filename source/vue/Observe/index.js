import Observe from './observe'


export function initState(vm) {
  let opts = vm.$options
  if (opts.data) {
    initData(vm)
  }
  if (opts.computed) {
    initComputed(vm)
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

function initComputed(vm) {

}

function initWatch(vm) {

}