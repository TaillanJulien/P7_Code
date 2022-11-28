// Importation et configuration de vue
import Vue from 'vue'
Vue.config.productionTip = false

// Importation de l'application app
import App from './App.vue'

// Importation des routes
import router from './router/routes'

// Importation store
import store from './store'

// Importation moments
import moment from 'moment'
Vue.filter("formatDate", function(date){
  if(date){
    moment.locale('fr');
    const momentDate = moment(date)
      return momentDate.calendar()
  }
})

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
