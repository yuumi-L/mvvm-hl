const defaultRE = /\{\{((?:.|\r?\n)+?)\}\}/g

export const util = {
  getValue(vm, exp) {
    let keys = exp.split('.')
    return keys.reduce((memo, current) => {
      memo = memo[current]
      return memo
    }, vm)
  },
  compilerText(node, vm) {
    // 编译文本 
    if (!node.expr) {
      node.expr = node.textContent
    }
    node.textContent = node.expr.replace(defaultRE, function (...args) {
      return util.getValue(vm, args[1])
    })
  }
}


export function compiler(node, vm) {
  // 取出子节点
  let childNodes = node.childNodes;
  // 将类数组转成数组
  [...childNodes].forEach(child => {
    /** 
     * nodeType 
     * 1 元素节点
     * 3 text 文本节点
     * 
    */
    if (child.nodeType === 1) {
      compiler(child, vm)
    } else if (child.nodeType === 3) {
      util.compilerText(child, vm)
    }
  });
} 