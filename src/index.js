import Vue from 'vue'

let vm = new Vue({
  el: '#app',
  data() {
    return {
      msg: 'hello',
      arr: [1, 2, 3, 4, 5]
    }
  },
  computed: {},
  watch: {}
})
setTimeout(() => {
  vm.msg = 'world1'
  vm.msg = 'world2'
  vm.msg = 'world3'
  vm.msg = 'world4'
  vm.msg = 'world5'
  vm.msg = 'world6'
}, 2000);
// console.log(vm)
// vm.arr.push(123)
// vm.arr[1] = 123 