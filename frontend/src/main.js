// Importation et configuration de vue
import Vue from 'vue'
Vue.config.productionTip = false

// Importation de l'application app
import App from './App.vue'

// Importation des routes
import router from './router/routes'

// Importation store
import store from './store'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
