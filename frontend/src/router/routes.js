// ----- Importation des composants pour routage ----- //

// Composants pour les post
import all_post from '../views/posts/all_post.vue';
import create_post from '../views/posts/create_post.vue'

// Composants pour les users
import user_signup from '../views/user_actions/user_signup.vue';
import user_login from '../views/user_actions/user_login.vue';

// Definition des routes

const routes = [
  // Post routes
  {path: '/post', name: 'all_post', component: all_post},
  {path: '/create_post', name: 'create_post', component: create_post},

  // Users routes
  {path: '/login', name: 'user_login', component: user_login,},
  {path: '/signup', name: 'user_signup', component: user_signup,},
]

// Exportation des routes vers main.js
export default routes
