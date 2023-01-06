<template>
  <section class="post">
    <CreatePost @getPosts="getPosts"></CreatePost>
    <div class="user_post" v-for="post in posts" :key="post._id">

<!-- Informations utilisateur + menu-->

        <div class="user_infos">
            <UserInfos :users = users :userId = post.userId></UserInfos>
            <div class="user_infos_menu" v-if="post.userId === user.userId || user.email === 'admin@gmail.com'">
              <ul>
                <li>
                  <a href="" tabindex="0"><i class="fa-solid fa-ellipsis"></i></a>
                  <ul class="sous" tabindex="0">
                    <li class="user_infos_menu_buttons" @click="modifyPost.id = post._id, modifyPost.message = post.message" tabindex="0">Modifier</li>
                    <li class="user_infos_menu_buttons" @click="deletePost(post._id, post.userId)" tabindex="0">Supression</li>
                  </ul>
                </li>
              </ul>
            </div>  
        </div>
      
<!-- Contenu post + modifier + supprimer  -->

      <div class="user_posted_message" >
        <div class="container_modify_delete" v-if="modifyPost.id === post._id">
          <input type="text" v-model="modifyPost.message" class="form_modify_content">
          <div class="container_form_modify_button">
            <button class="form_modify_button" type="submit" @click="modifyPostCall(post)">Modifier</button>
            <button class="form_modify_button" @click="modifyPost.id = '', modifyPost.message = ''">Annuler</button>
          </div>
          <div v-if="post.imageUrl != ''" class="modify_img_container">
            <p>Souhaitez-vous modifier votre image ?</p>
            <form @submit.prevent="submit" enctype="multipart/form-data">
              <input v-on:change="changeImg" ref="image" type="file" name="uploaded_file" id="image" value="Choisir une nouvelle image">
            </form>
            <img :src="`${post.imageUrl}`" alt="">
          </div>
        </div>
        <div v-else>
          <p>{{ post.message }}</p>
          <div v-if="post.imageUrl != ''" class="img_container">
            <img :src="`${post.imageUrl}`" alt="">
          </div>
        </div>
        <div class="user_timer">
          <p>Posté {{ post.date | formatDate }}</p>
        </div>
      </div>

<!-- Likes + bouton pour commenter -->

      <div v-if="(modifyPost != post._id)" class="button_like_comment">
          <NewComment :postId = 'post._id' @getComments="getComments"></NewComment>
        <button v-if="!post.likes.includes(user.userId)" @click="likePost(post)"><i class="fa-regular fa-thumbs-up"></i></button>
        <div v-else class="dislike"  >
          <button><i class="fa-regular fa-thumbs-down" @click="likePost(post)"></i></button>
        </div>
        <i v-if="post.likes.length > 0" class="fa-solid fa-heart"> {{ post.likes.length }}</i>
      </div>

<!-- Partie commentaire  -->

      <div v-if="(modifyPost != post._id)">
        <div v-for="comment in comments" :key="comment._id">
          <div class="user_comment" v-if="post._id === comment.postId">
            
            <!-- Informations user + menu -->
            
            <div class="user_infos" id="user_infos_comment">
                <UserInfos :users = users :userId = comment.userId></UserInfos>
                <div  class="user_infos_menu" v-if="comment.userId === user.userId || user.email === 'admin@gmail.com'">
                  <ul>
                    <li>
                      <a href=""><i class="fa-solid fa-ellipsis"></i></a>
                      <ul class="sous">
                        <li class="user_infos_menu_buttons" @click="modifyComment.id = comment._id, modifyComment.message = comment.message">Modifier</li>
                        <li class="user_infos_menu_buttons" v-if="user.userId === comment.userId" @click="deleteComment(comment._id, comment.userId)">Supression</li>
                      </ul>
                    </li>
                  </ul>
                </div>
            </div>

              <!-- Contenu du commentaire + modifier + supprimer -->

            <div class="user_comment_container">
              <div v-if="modifyComment.id === comment._id" class="container_modify_delete">
                <input class="form_modify_content" type="text" v-model="modifyComment.message">
                <div class="container_form_modify_button">
                  <button class="form_modify_button" @click="modifyCommentCall(comment)">Modifier</button>
                  <button class="form_modify_button" @click="modifyComment.id = '', modifyComment.message = ''">Annuler</button>
                </div>
              </div>
              <div v-else class="comment_container">
                <p id="comment_message">{{ comment.message }}</p>
              </div>
              <div class="user_timer">
                <p>Posté {{ post.date | formatDate }}</p>
              </div>
            </div>           
          </div>
        </div>
      </div> 
    </div>
  </section>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import CreatePost from './CreatePost.vue';
import NewComment from '../comments/NewComment.vue'
import UserInfos from '../user_actions/UserInfos.vue'

export default {
    name: "AllPosts",
    components: {CreatePost, NewComment, UserInfos},
    data() {
        return {
            image: "",
            posts: "",
            users: "",
            comments: "",
            modifyPost: {
              id: "",
              message: ""
            },
            modifyComment: {
              id: "",
              message: ""
            }
        };
    },
    computed: {
        ...mapGetters({
            user: "getUser"
        })
    },
    methods: {
      getComments(){
        axios.get("http://localhost:3000/api/comments/", {headers: {Authorization: localStorage.getItem('token')}})
        .then((res => {
              this.comments = []
              const commentReverse = res.data.reverse()
              this.comments = commentReverse
            }))
            .catch(err => console.log(err));
      },
      deleteComment(_id){
        if(confirm('Etes-vous sûr de vouloir supprimer ce commentaire ?') === true){
          axios.delete(`http://localhost:3000/api/comments/${_id}`, {headers: {Authorization: localStorage.getItem('token')}})
          .then(res => {
            if(res.status === 201){
              this.getComments()
            } else {
              err => {console.log(err.response)}
            }
          })      
        }
      },
      modifyCommentCall(comment){
        if(this.modifyComment.message.length <= 0){
          this.deleteComment(comment._id, comment.userId)
        }
        if(comment.message != this.modifyComment.message){
          comment.message = this.modifyComment.message
          axios.put(`http://localhost:3000/api/comments/${comment._id}`, comment, {headers: {Authorization: localStorage.getItem('token')}})
          .then(res => {
            if(res.status === 201){
              this.getComments()
              this.modifyComment.id = ''
              this.modifyComment.message = ''
            } else {
              err => {console.log(err.res)}
            }
          })
        }
      },
      getPosts(){
        axios.get("http://localhost:3000/api/post/", {headers: {Authorization: localStorage.getItem('token')}})
            .then((res => {
              const postReverse = res.data.reverse()
              this.posts = postReverse
            }))
            .catch(err => console.log(err));
      },
      deletePost(_id){
        if(confirm('Etes-vous sûr de vouloir supprimer ce post ?') === true){
          axios.delete(`http://localhost:3000/api/post/${_id}`, {headers: {Authorization: localStorage.getItem('token')}})
          .then(res => {
            if(res.status === 201){
              this.getPosts()
            } else {
              err => {console.log(err.res)}
            }
          })
        }
      },
      changeImg(){
        this.image = this.$refs.image[0].files[0];
      },
      modifyPostCall(post){
        if(this.modifyPost.message.length <= 0){
          this.deletePost(post._id, post.userId)
        }
          const formData = new FormData();
          formData.append('message', this.modifyPost.message)
          formData.append('userId', this.user.userId)
          if(this.image != '') {
            formData.append('image', this.image, this.image.filename)
          } 
          axios.put(`http://localhost:3000/api/post/${post._id}`, formData, {headers: {Authorization: localStorage.getItem('token')}})
          .then(res => {
            if(res.status === 201){
              this.getPosts()
              this.modifyPost.id = ''
              this.modifyPost.message = ''
              this.image = ''
            } else {
              err => {console.log(err.res)}
            }
          })  
      },
      likePost(post){
          if(!post.likes.includes(this.user.userId)){
            post.likes.push(this.user.userId)
            axios.put(`http://localhost:3000/api/post/${post._id}`, post, {headers: {Authorization: localStorage.getItem('token')}})
            .then(res => {
              if(res.status === 201){
                this.getPosts()
              } else {
                err => {console.log(err.res)}
              }
            })
          } else {
            const index = post.likes.indexOf(this.user.userId)
            post.likes.splice(index, 1)
            axios.put(`http://localhost:3000/api/post/${post._id}`, post, {headers: {Authorization: localStorage.getItem('token')}})
            .then(res => {
              if(res.status === 201){
                this.getPosts()
              } else {
                err => {console.log(err.res)}
              }
            })
          }
      },  
    },
    mounted() {
      axios.get("http://localhost:3000/api/user/getAllUsers/")
          .then(res => (this.users = res.data))
          .catch(err => console.log(err));
          this.getPosts()
          this.getComments()
        },
      }
    </script>

<style scoped>
/* keyframes pour animations */
@keyframes widthAnim{
    0% {
        width: 0%;
    }
    100% {
        width: 70%;
    }
}
@keyframes opacityAnim{
    0% {
        opacity: 0;
    }
    50%{
      opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

/* Post global */
.post{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
}
.user_post{
  background-color: white;
  margin: 15px 35px 35px 35px;
  display: flex;
  flex-direction: column;
  border-radius: 30px;
  box-shadow: 7px 9px 7px 1px rgba(0,0,0,0.76);
  padding: 15px;
  transform: scale(1);
  transition: transform 600ms;
  animation: widthAnim 800ms ease-in-out;
  animation-fill-mode: forwards;
}
.user_post:hover{
  transform: scale(1.01);
}

/* Informations utilisateur */
.user_infos{
  display: flex;
  align-content: stretch;
  flex-wrap: wrap;
  transition: transform 600ms;
  animation: opacityAnim 800ms ease-in-out;
  animation-fill-mode: forwards;
}

/* Menu déroulant */
li {
  list-style:none;
  color:black;
  padding-right: 7px;
  margin: 0 5px 5px 5px;
  font-size:15px;
  border-radius: 15px;
  cursor: pointer;
  text-decoration: none;
  list-style:none;
}
.user_infos_menu ul {
  padding: 0;
  margin: 0;
  text-decoration: none;
  list-style:none;
}
.user_infos_menu ul li a {
  color: black;
  padding: 5px;
  font-size: 20px;
}
.user_infos_menu ul li ul { 
  display: none; 
} 
.user_infos_menu ul li:hover ul { 
  display: list-item;
  position: absolute;
  margin-top: -34px;
  margin-left: 35px;
}
.user_infos_menu_buttons{
  background-color: lightgray;
  padding: 10px;
}

/* Contenu principal (texte et/ou image) du post  */
.user_posted_message{
  width: auto;
  margin: 0 15px 15px 15px;
  border-bottom: 1px lightgray solid;
  padding-bottom: 15px;
}
.user_posted_message p{
  margin: 25px 0 20px 0;
  padding: 15px 0 15px 0;
  border-bottom: 1px lightgray solid;
  border-top: 1px lightgray solid;
  transition: transform 600ms;
  animation: opacityAnim 800ms ease-in-out;
  animation-fill-mode: forwards;
}
.img_container{
  display: flex;
  justify-content: center;
  width: 100%;
}
.img_container img{
  object-fit: contain;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0px 10px 13px -7px #000000;
  margin-bottom: 20px;
}
.modify_img_container{
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
}
.modify_img_container > p{
  align-self: center;
}
#image{
  margin: 15px;
}
.user_timer{
  display: flex;
  justify-content: center;
  font-style: italic;
  transition: transform 600ms;
  animation: opacityAnim 800ms ease-in-out;
  animation-fill-mode: forwards;
  margin-top: 15px;
}
.user_timer > p{
  background-color: rgb(237, 237, 237);
  padding: 10px;
  border-radius: 15px;
  border-top: solid lightgrey;
  border-bottom: solid lightgrey;
  margin: 0;
}

/* Likes + bouton pour commenter */
.button_like_comment{
  display: flex;
  align-items: center;
  flex-direction: column-reverse;
  width: 100%;
  overflow: hidden;
  animation-delay: 10s;
  animation: opacityAnim 800ms ease-in-out;
  animation-fill-mode: forwards;
}
.button_like_comment > button{
  width: 30%;
  font-size: 20px;
  margin: 5px;
  padding: 10px;
  border-radius: 15px;
  background-color: white;
  font-weight: bold;
  box-shadow: 5px 5px 5px -2px rgba(0,0,0,0.35);
  animation: opacityAnim 400ms ease-in-out;
  animation-fill-mode: forwards;
}
.button_like_comment > i {
  margin: 5px;
  color: darkred;
  animation: opacityAnim 400ms ease-in-out;
  animation-fill-mode: forwards;
  font-size: 25px;
  align-self: center;
}
.dislike{
  display: flex;
  justify-content: center;
  padding: 10px;
}
.dislike > button {
  font-size: 25px;
  border-radius: 15px;
  background-color: white;
  font-weight: bold;
  cursor: pointer;
  border: none;
  animation: opacityAnim 400ms ease-in-out;
  animation-fill-mode: forwards;
}

/* Contenu commentaire */
#user_infos_comment{
  border-top: 1px lightgray solid;
  margin: 20px 0 0 0;
  padding-top: 15px;
}
.comment_container{
  box-sizing: border-box;
  width: 100%;
}
#comment_message{
  width: fit-content;
  word-break: break-word;
  overflow-wrap: break-word;
  background-color: lightgray;
  padding: 15px;
  border-radius: 25px 45px 25px 45px;
  margin: 25px 0 10px 0;
  box-shadow: 5px 5px 5px -2px rgba(0,0,0,0.35);
  transition: transform 600ms;
  animation: opacityAnim 800ms ease-in-out;
  animation-fill-mode: forwards;
}

/* Formulaire de modification de post et commentaire */
.container_modify_delete{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.form_modify_content{
  border: 1px solid rgba(0,0,0,0.35);
  box-shadow: 5px 5px 5px -2px rgba(0,0,0,0.35);
  border-radius: 13px;
  width: 80%;
  padding: 10px;
  margin: 10px 0 20px 0;
}
.container_form_modify_button{
  display: flex;
  justify-content: center;
}
.form_modify_button{
  font-size: 15px;
  margin: 5px;
  padding: 10px;
  border-radius: 15px;
  background-color: white;
  font-weight: bold;
  box-shadow: 5px 5px 5px -2px rgba(0,0,0,0.35);
  cursor: pointer;
}

/* Responsive */
@media (max-width: 768px){
  .post{
    width: 100%;
  }
  .user_post{
    width: 90%;
    margin: 20px 0 20px 0;
  }
  .user_infos_menu{
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .user_comment_container{
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .button_like_comment > button{
    width: 40%;
  }
}
</style>
