import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
import VueSpinners from 'vue-spinners'

Vue.use(VueSpinners)

Vue.use(Vuelidate)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
