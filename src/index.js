import Vue from 'vue'

let vm = new Vue({
  el: '#app',
  data() {
    return {
      msg: 'hello',
      arr: [1, 2, 3, 4, 5],
      hl: 'hongl',
      age: 21
    }
  },
  computed: {
    name() {
      return this.hl + this.age
    }
  },
  watch: {
    msg(newValue, oldValue) {
      console.log(newValue, oldValue)
    }
  }
})
setTimeout(() => {
  // vm.arr.push(6)
  vm.age = 18
  console.log(vm)
}, 2000);
// console.log(vm)
// vm.arr.push(123)
// vm.arr[1] = 123 