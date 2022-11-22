// Importation de vuex
import Vuex from 'vuex';

// Importation de vue
import Vue from 'vue';

// Utilisation store dans vue
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        panpan: 'panpan'
    },
    getters: {
        getPanpan: state => {
            return state.panpan
        }
    },
    mutations: {
        SET_PANPAN(state, panpan){
            state.panpan = panpan
        }
    }
})

export default store