// Importation et configuration de vue
import Vue from 'vue'
Vue.config.productionTip = false

// Importation de l'application app
import App from './App.vue'

//Importation de vue router et utilisation dans l'application
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// Importation des routes
import routes from './router/routes'

const router = new VueRouter({
  routes: routes,
  mode: 'history'
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
