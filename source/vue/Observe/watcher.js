import { pushTarget, popTarget } from "./dep"

let id = 0
class Watcher {
  constructor(vm, exprOrFn, cb = () => { }, opts) {
    this.vm = vm
    this.expOrFn = exprOrFn
    this.cb = cb
    this.id = id++
    this.deps = []
    this.depsId = new Set()
    if (typeof exprOrFn === 'function') {
      this.getter = exprOrFn
    }
    this.get() // 默认创建一个watcher  会调用自身的get  
  }
  get() {
    // 渲染watcher
    pushTarget(this) // Dep.target = watcher
    this.getter() //  当获取属性的时候 会增加一个watcher
    popTarget()
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
    // 批量更新防止重复渲染
    queueWatcher(this)
    // this.get()
  }
  run() {
    this.get()
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