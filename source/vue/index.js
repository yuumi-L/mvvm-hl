import { initState } from './Observe'


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

}

export default Vue