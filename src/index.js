import Vue from 'vue'

let vm = new Vue({
  el:'#app',
  data(){
    return {
      msg:'hello',
      arr:[1,2,3,4,5]
    }
  },
  computed:{},
  watch:{}
})

vm.arr.push(123)
// vm.arr[1] = 123 