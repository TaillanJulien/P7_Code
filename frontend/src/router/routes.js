// ----- Importation des composants pour routage ----- //

// Composant page accueil
import homepage_component from '../components/homepage_component';

// Composants pour les post
import all_post from '../views/posts/all-post.vue';
import create_post from '../views/posts/create-post.vue';

// Composants pour les users
import user_signup from '../views/user_actions/user_signup.vue';
import user_login from '../views/user_actions/user_login.vue';

// Composant 404
import not_found from '../components/not_found_component.vue';

// Definition des routes

const routes = [
  // Page accueil route
  {path: '/', name: 'homepage', component: homepage_component},

  // Post routes
  {path: '/all-post', name: 'all_post', component: all_post},
  {path: '/create-post', name: 'create_post', component: create_post},

  // Users routes
  {path: '/login', name: 'user_login', component: user_login,},
  {path: '/signup', name: 'user_signup', component: user_signup,},

  // Page inexistante
  {path: '*', name: 'not_found', component: not_found}
]

// Exportation des routes vers main.js
export default routes
