import { observe } from './index'
import { arrayMethods } from './array'

class Observe{  
  constructor(data){ // data 就是vue里面定义的数据 vm._data
    // 实现监听  将用户的数据使用Object.defineProperty 定义
    if(Array.isArray(data)){
      data.__proto__ = arrayMethods 
    }else{
      this.walk(data)    
    }
  }

  walk(data){
    let keys = Object.keys(data)
    
    for(let i = 0; i < keys.length; i++){
      let key = keys[i]  // 所有的key
      let value = data[keys[i]] // 所有的value
      defineReactive(data, key, value)
    }
  }
}

export function defineReactive(data, key, value){
  // 观察value 是不是一个对象然后监听  如果是一个对象就递归监听
  observe(value)
  Object.defineProperty(data, key, {
    get(){
      console.log('获取数据')
      return value
    },
    set(newValue){
      console.log('更改数据')
      if(newValue = value){
        return 
      }
      // 可能在设置的时候是一个对象
      observe(newValue)
      value = newValue  
    }
  })
}

export default Observe