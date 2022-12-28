<template>
  <section class="post">
    <CreatePost @getPosts="getPosts"></CreatePost>
    <div class="user_post" v-for="post in posts" :key="post._id">

<!-- Informations utilisateur -->

      <div class="user_post_info">
        <div class="user_post_info_img">
          <img src="../../assets/photo_profil.jpg" alt="photo_moi">
        </div>
        <div class="user_post_info_name_timer">
          <div class="user_name">
            <UserInfos :users = users :userId = post.userId></UserInfos>
            <div class="menu" v-if="post.userId === user.userId || user.email === 'admin@gmail.com'">
              <ul>
                <li>
                  <a href=""><i class="fa-solid fa-ellipsis"></i></a>
                  <ul class="sous">
                    <li class="buttonsPoints" @click="modifyPost.id = post._id, modifyPost.message = post.message">Modifier</li>
                    <li class="buttonsPoints" @click="deletePost(post._id, post.userId)">Supression</li>
                  </ul>
                </li>
              </ul>
            </div>      
          </div>
          <p class="user_timer">{{ post.date | formatDate }}</p>
        </div>
      </div>

<!-- Message et/ou photo partagé par l'utilisateur qu'il modifie + modification + suppression -->

      <div class="user_posted_message" >
        <div v-if="modifyPost.id === post._id">
          <input type="text" v-model="modifyPost.message" >
          <button @click="modifyPostCall(post)">Modifier</button>
          <button @click="modifyPost.id = '', modifyPost.message = ''">Annuler</button>
        </div>
        <div v-else>
          <p>{{ post.message }}</p>
          <img v-if="post.imageUrl != ''" :src="`${post.imageUrl}`" alt="">
        </div>
      </div>

<!-- Partie likes + bouton pour commenter -->

      <div v-if="(modifyPost != post._id)" class="button_post">
        <NewComment :postId = 'post._id' @getComments="getComments"></NewComment>
        <button v-if="!post.likes.includes(user.userId)" @click="likePost(post)"><i class="fa-regular fa-thumbs-up"></i></button>
        <div class="dislike" v-else >
          <button><i class="fa-regular fa-thumbs-down" @click="likePost(post)"></i></button>
        </div>
        <i v-if="post.likes.length > 0" class="fa-solid fa-heart"> {{ post.likes.length }}</i>
      </div>

<!-- Partie commentaire  -->

      <div v-if="(modifyPost != post._id)">
        <div v-for="comment in comments" :key="comment._id">
          <div class="user_comment" v-if="post._id === comment.postId">
            
            <!-- Partie info user qui commente + modification + suppression -->
            
            <div class="user_comment_info">
              <div class="user_comment_info_name_timer">
                <div class="user_comment_info_img">
                  <img src="../../assets/photo_profil_2.jpg" alt="photo moi 2">
                </div>
                <UserInfos :users = users :userId = comment.userId></UserInfos>
                <div class="menu" v-if="comment.userId === user.userId || user.email === 'admin@gmail.com'">
                  <ul>
                    <li>
                      <a href=""><i class="fa-solid fa-ellipsis"></i></a>
                      <ul class="sous">
                        <li class="buttonsPoints" @click="modifyComment.id = comment._id, modifyComment.message = comment.message">Modifier</li>
                        <li class="buttonsPoints" v-if="user.userId === comment.userId" @click="deleteComment(comment._id, comment.userId)">Supression</li>
                      </ul>
                    </li>
                  </ul>
                </div>
                <p class="user_comment_timer">{{ comment.date | formatDate }}</p> 
              </div>
            </div>

              <!-- Partie contenu du commentaire -->

            <div class="user_comment_message">
              <div v-if="modifyComment.id === comment._id">
                <input type="text" v-model="modifyComment.message">
                <button @click="modifyCommentCall(comment)">Modifier</button>
                <button @click="modifyComment.id = '', modifyComment.message = ''">Annuler</button>
              </div>
              <p v-else >{{ comment.message }}</p>
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
      modifyPostCall(post){
        if(this.modifyPost.message.length <= 0){
          this.deletePost(post._id, post.userId)
        }
        if(post.message != this.modifyPost.message){
          post.message = this.modifyPost.message
          axios.put(`http://localhost:3000/api/post/${post._id}`, post, {headers: {Authorization: localStorage.getItem('token')}})
          .then(res => {
            if(res.status === 201){
              this.getPosts()
              this.modifyPost.id = ''
              this.modifyPost.message = ''
            } else {
              err => {console.log(err.res)}
            }
          })
        }
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
.post{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
}
.user_post{
  width: 60%;
  overflow: hidden;
  background-color: white;
  margin: 15px 35px 35px 35px;
  display: flex;
  flex-direction: column;
  border-radius: 30px;
  box-shadow: 7px 9px 7px 1px rgba(0,0,0,0.76);
  transform: scale(1);
  transition: transform 600ms;
  padding: 15px;
  transform-origin: 0% right;
  animation: widthAnim 800ms ease-in-out;
  animation-fill-mode: forwards;
}
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
.menu ul {
  padding: 0;
  margin: 0;
  text-decoration: none;
  list-style:none;
}
.menu ul li a {
  color: black;
  padding: 5px;
  font-size: 20px;
}
.menu ul li ul { 
  display: none; 
} 
.menu ul li:hover ul { 
  display: list-item;
  position: absolute;
  margin-top: -34px;
  margin-left: 35px;
}
.buttonsPoints{
  background-color: lightgray;
  padding: 10px;
}
.user_post:hover{
  transform: scale(1.02);
}
.user_post_info{
  display: flex;
  flex-wrap: wrap;
  margin: 15px;
  border-bottom: 1px lightgray solid;
  padding-bottom: 15px;
  overflow: hidden;
  animation-delay: 10s;
  animation: opacityAnim 100ms ease-in-out;
  animation-fill-mode: forwards;
}
.user_name{
  display: flex;
}
.user_timer{
  font-style: italic;
  margin: 0 0 15px 0;
}
.user_post_info_img img{
  border-radius: 30px;
  width: 50px;
  height: 50px;
  margin-right: 10px;
}
.user_posted_message{
  width: auto;
  margin: 0 15px 15px 15px;
  border-bottom: 1px lightgray solid;
  padding-bottom: 15px;
  overflow: hidden;
  animation-delay: 10s;
  animation: opacityAnim 100ms ease-in-out;
  animation-fill-mode: forwards;
}
.user_posted_message p{
  margin: 5px 0 15px 0;
  align-self: flex-start;
}
.user_posted_message_img{
  width: 100%;
  display: flex;
  justify-content: center;
}
.user_posted_message_img img{
  width: 70%;
  object-fit: contain;
  border-radius: 10px;
}
.user_posted_message button{
    font-size: 15px;
    margin: 5px;
    padding: 5px;
    border-radius: 15px;
    background-color: white;
    font-weight: bold;
    cursor: pointer;
    border: none;
}
.user_posted_message input {
    border: 1px solid rgba(0,0,0,0.35);
    box-shadow: 5px 5px 5px -2px rgba(0,0,0,0.35);
    border-radius: 13px;
    padding: 10px;
}
.button_post{
  display: flex;
  align-self: center;
  flex-direction: column-reverse;
  width: 35%;
  overflow: hidden;
  animation-delay: 10s;
  animation: opacityAnim 800ms ease-in-out;
  animation-fill-mode: forwards;
}
.button_post > button{
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
.button_post > i {
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
  font-size: 25px;
  border-radius: 15px;
  background-color: white;
  font-weight: bold;
  cursor: pointer;
  border: none;
  animation: opacityAnim 400ms ease-in-out;
  animation-fill-mode: forwards;
}
.user_comment{
  display: flex;
  flex-direction: column;
  border-bottom: 1px lightgray solid;
  margin: 15px;
  animation-delay: 10s;
  animation: opacityAnim 900ms ease-in-out;
  animation-fill-mode: forwards;
}
.user_comment_info_img {
  margin-right: 10px;
}
.user_comment_info_img img{
  width: 50px;
  height: 50px;
  border-radius: 30px;
}
.user_comment_info_name_timer{
  display: flex;
  flex-wrap: wrap;
}
.user_comment_info_name_timer p{
  margin: 0 0 0 15px;
}
.user_comment_name{
  font-weight: bold;
}
.user_comment_timer{
  font-style: italic;
}
.user_comment_message{
  margin: 15px;
  padding-bottom: 15px;
}
.user_comment_message p{
  padding: 10px;
  margin: 0;
  border-radius: 15px;
  background-color: lightgrey;
  width: fit-content;
}
@media (max-width: 992px){
    .user_post{
      width: 100%;
    }
    .button_post{
      width: 100%;
    }
  }
@media (max-width: 768px){
  .user_post_info{
    flex-direction: column;
  }
  .user_comment{
    flex-direction: column;
  }
  .user_comment_message{
    margin: 15px;
  }
}
</style>
