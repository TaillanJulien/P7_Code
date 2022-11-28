//Importation de vue router et utilisation dans l'application
import VueRouter from 'vue-router'
import Vue from 'vue'
Vue.use(VueRouter)

// Composant page accueil
import HomeComponent from '../components/HomeComponent';

// Composants pour les post
import AllPosts from '../views/posts/AllPosts.vue';
import CreatePost from '../views/posts/CreatePost.vue';

// Composants pour les users
import UserSignup from '../views/user_actions/UserSignup.vue';
import UserLogin from '../views/user_actions/UserLogin.vue';

// Composant 404
import PageError from '../components/PageError.vue';

// Importation store
import store from '../store/index';

// Definition des routes

const routes = [
  // Page accueil route
  {
    path: '/', 
    name: 'HomeComponent', 
    component: HomeComponent,
    beforeEnter: (to, from, next) => {
      if(store.getters.isAuth){
      next('/all-posts');
      } else {
        next()
      }
    }
  },

  // Post routes
  {
    path: '/all-posts', 
    name: 'AllPosts', 
    component: AllPosts,
    meta: {isAuth: true}
  },

  {
    path: '/create-post', 
    name: 'CreatePost', 
    component: CreatePost,
    meta: {isAuth: true}
  },

  // Users routes
  {
    path: '/login', 
    name: 'UserLogin', 
    component: UserLogin,
    beforeEnter: (to, from, next) => {
      if(store.getters.isAuth){
      next('/all-posts');
      } else {
        next()
      }
    }
  },
  
  {
    path: '/signup', 
    name: 'UserSignup', 
    component: UserSignup,
    beforeEnter: (to, from, next) => {
      if(store.getters.isAuth){
      next('/all-posts');
      } else {
        next()
      }
    }
  },

  // Page inexistante
  {
    path: '*', 
    name: 'PageError', 
    component: PageError
  }
]

// Utilisation vue router
const router = new VueRouter({
  routes: routes,
  mode: 'history'
})

// BeforeEach pour vérifier l'état de l'user (droit accès à la page ou non)
router.beforeEach((to, from, next) => {
  if(to.matched.some((record) => record.meta.isAuth)){
    if(store.getters.isAuth){
      next();
      return;
    } else {
      next('/')
    }
  } else {
      next();
  }
})

// Exportation des routes vers main.js
export default router




