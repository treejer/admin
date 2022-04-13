import Vue from 'vue';


 const coin = {
  bind(el) {
      let sliceAccount = ''
      const account = el.innerText.split('')
      const firstRow = account.slice(0, 5)
      const secondRow = account.reverse().slice(0, 4).reverse()
      const sep = ['....']
      const accountArrayFinal = firstRow.concat(sep).concat(secondRow)
      accountArrayFinal.map(item => item !== null ? sliceAccount += item.toString() : null)
      return  el.innerText = sliceAccount


  }
}

// You can also make it available globally.
Vue.directive('coin', coin)
