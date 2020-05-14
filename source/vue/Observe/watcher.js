import { pushTarget, popTarget } from "./dep"
import { util } from "../util"

let id = 0
class Watcher {
  constructor(vm, exprOrFn, cb = () => { }, opts = {}) {
    this.vm = vm
    this.expOrFn = exprOrFn
    this.cb = cb
    this.id = id++
    this.deps = []
    this.depsId = new Set()
    this.lazy = opts.lazy
    this.dirty = this.lazy
    if (typeof exprOrFn === 'function') {
      this.getter = exprOrFn
    } else {
      // 现在 exprOrFn 是我们传进来的key
      this.getter = function () {
        return util.getValue(vm, exprOrFn)
      }
    }
    if (opts.user) {
      this.user = true
    }
    // 如果当前是计算属性的话 不会默认调用get方法
    this.value = this.lazy ? undefined : this.get() // 取出的是老值
  }
  evalValue() {
    this.value = this.get()
    this.dirty = false
  }
  get() {
    // 渲染watcher
    pushTarget(this) // Dep.target = watcher
    let value = this.getter.call(this.vm) //  当获取属性的时候 会增加一个watcher
    popTarget()
    return value
  }
  addDep(dep) {
    let id = dep.id
    if (!this.depsId.has(dep)) {
      this.depsId.add(id)
      // 当前的watcher记住dep
      this.deps.push(dep)
      dep.addSub(this)
    }
  }
  update() {
    if (this.lazy) {
      this.dirty = true
    }
    // 批量更新防止重复渲染
    queueWatcher(this)
    // this.get()
  }
  run() {
    let value = this.get()  // 新值
    if (this.value !== value) { // this.value 是老值 value 是新值
      this.cb(value, this.value)
    }
  }
  depend() { // 主要用于conputer的watcher
    let i = this.deps.length
    while (i--) {
      this.deps[i].depend()
    }
  }
}
let has = {}
let queue = []

function flusqueue() {
  queue.forEach(watcher => watcher.run())
  has = {}
  queue = []
}

function queueWatcher(watcher) {
  let id = watcher.id
  if (has[id] == null) {
    has[id] = true
    queue.push(watcher)
  }
  nextTick(flusqueue)
}
let callbacks = []

function flushCallbacks() {
  callbacks.forEach(cb => cb())
}

function nextTick(flusqueue) {
  callbacks.push(flusqueue)
  let asyncFn = () => {
    flushCallbacks()
  }
  // 微任务
  if (Promise) {

    Promise.resolve().then(asyncFn)
  }
  // 宏任务
  setTimeout(() => {
    asyncFn
  }, 0);
}

export default Watcher