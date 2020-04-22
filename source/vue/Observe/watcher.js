import { pushTarget, popTarget } from "./dep"

let id = 0
class Watcher{
  constructor(vm, exprOrFn, cb = ()=>{}, opts){
    this.vm = vm
    this.expOrFn = exprOrFn
    this.cb = cb
    this.id = id++
    if(typeof exprOrFn === 'function'){
      this.getter = exprOrFn
    }
    this.get() // 默认创建一个watcher  会调用自身的get  
  }
  get(){
    // 渲染watcher
    pushTarget(this) // dep.target = watcher
    this.getter()
    popTarget()
  }
}

export default Watcher