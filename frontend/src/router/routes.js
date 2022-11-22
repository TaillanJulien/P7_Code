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

// Definition des routes

const routes = [
  // Page accueil route
  {path: '/', name: 'HomeComponent', component: HomeComponent},

  // Post routes
  {path: '/all-posts', name: 'AllPosts', component: AllPosts},
  {path: '/create-post', name: 'CreatePost', component: CreatePost},

  // Users routes
  {path: '/login', name: 'UserLogin', component: UserLogin,},
  {path: '/signup', name: 'UserSignup', component: UserSignup,},

  // Page inexistante
  {path: '*', name: 'PageError', component: PageError}
]

// Utilisation vue router
const router = new VueRouter({
  routes: routes,
  mode: 'history'
})

// Exportation des routes vers main.js
export default router




