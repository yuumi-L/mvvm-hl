import { initState } from './Observe'
import { compiler } from './util'
import Watcher from './Observe/watcher'

function Vue(options){
  // 初始化用户传入的选项
  this._init(options)
}

// 初始化参数
Vue.prototype._init = function(options){
  let vm = this
  vm.$options = options
  // 重新初始化状态 data computed watch
  initState(vm)
  // 初始化渲染页面
  if(vm.$options.el){
    vm.$mount()
  }
}

Vue.prototype.$mount = function (){
  let vm = this
  let el = vm.$options.el
  el = vm.$el = query(el)  // 获取当前的节点
  // 渲染节点  通过watcher渲染
  let updateComponent = ()=> {
    console.log('更新和渲染的实现')
    vm._update()
  }
  new Watcher(vm, updateComponent)
}

Vue.prototype._update = function(){
  // 难道数据更新视图
  let vm = this
  let el = vm.$el
  // 渲染所有元素把内容换成数据
  let node = document.createDocumentFragment()
  let firstChild
  while(firstChild = el.firstChild){
    node.appendChild(firstChild)
  }
  // 文本替换
  compiler(node, vm)  
  el.appendChild(node) // 替换完再放进总的文档当中

}

function query(el){
  if(typeof el === 'string'){
    return document.querySelector(el)
  }
  return 
}

export default Vue