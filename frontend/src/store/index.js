// Importation de vuex
import Vuex from 'vuex';

// Importation de vue
import Vue from 'vue';

// Important du plugin pour un store persistant
import createPersistedState from "vuex-persistedstate";

// Utilisation store dans vue
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        user: {
            email: "",
            firstName: "",
            lastName: "",
            token: ""
        },
    },
    getters: {
        getUser: state => {
            return state.user
        },
        isAuth: state => {
            return !!state.user 
        },
    },
    mutations: {
        SET_USER(state, user){
            state.user = user
        }
    },
    plugins: [createPersistedState()],
})

export default store