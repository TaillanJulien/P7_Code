<template>
<section class="post">
  <div class="user_post" v-for="post in posts" :key="post._id">
    <div class="user_post_info">
      <div class="user_post_info_img">
        <img src="../../assets/photo_profil.jpg" alt="photo_moi">
      </div>
      <div class="user_post_info_name_timer">
        <div class="user_name" v-for="user in users" :key="user._id">
          <p v-if="post.userId === user._id"> {{ user.firstName + ' ' + user.lastName }} </p>
        </div>
        <p class="user_timer">Il y a "timer"</p>
      </div>
    </div>
    <div class="user_posted_message" >
      <p>{{ post.message }}</p>
      <div class="user_posted_message_img">
        <img src="" alt="">
      </div>
    </div>
    <div class="button_post">
      <button><i class="fa-regular fa-thumbs-up"></i> J'aime</button>
      <button><i class="fa-regular fa-comment"></i> Commenter</button>
    </div>
    <div class="form_post">
      <input type="text" id="comment" name="comment" placeholder="Veuillez saisir votre commentaire">
    </div>
    <div v-for="comment in comments" :key="comment._id">
      <div class="user_comment" v-if="post._id === comment.postId">
        <div class="user_comment_info">
          <div class="user_comment_info_img">
            <img src="../../assets/photo_profil_2.jpg" alt="photo moi 2">
          </div>
          <div class="user_comment_info_name_timer">
            <div v-for="user in users" :key="user._id">
              <div class="user_comment_name">
                <p v-if="comment.userId === user._id">{{ user.firstName + ' ' + user.lastName }}</p>
              </div>
            </div>
            <p class="user_comment_timer">Il y a "ici : timer"</p>
          </div>
        </div>
        <div class="user_comment_message"  >
          <p v-if="post._id === comment.postId" >{{ comment.message }}</p>
        </div>
      </div>
    </div>
  </div>
</section>
</template> 

<script>
import axios from 'axios'
import {mapGetters} from 'vuex'

export default {
  name: 'AllPosts',
  data() {
    return {
      posts: [],
      users: [],
      comments: []
    }
  },
  computed:{
    ...mapGetters({
      user: 'getUser'
    })
  },
  mounted () {
    axios.get ('http://localhost:3000/api/post/')
    .then(response => (this.posts = response.data))
    .then(response => console.log(response))
    .catch(err => console.log(err));
    
    axios.get ('http://localhost:3000/api/user/getAllUsers/')
    .then(response => (this.users = response.data))
    .then(response => console.log(response))
    .catch(err => console.log(err))

    axios.get ('http://localhost:3000/api/comments/')
    .then(response => (this.comments = response.data))
    .then (response => console.log(response))
    .catch(err => console.log(err))
  },
}

</script>

<style>
.post{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
}
.user_post{
  background-color: white;
  margin: 15px 35px 35px 35px;
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 30px;
  box-shadow: 7px 9px 7px 1px rgba(0,0,0,0.76);
  transform: scale(1);
  transition: transform 600ms;
}
.user_post:hover{
  transform: scale(1.02);
}
.user_post_info{
  display: flex;
  margin: 15px;
  border-bottom: 1px lightgray solid;
  padding-bottom: 15px;
}
.user_post_info_name_timer p{
  margin: 0 0 0 15px;
}
.user_name{
  font-weight: bold;
}
.user_timer{
  font-style: italic;
}
.user_post_info_img img{
  border-radius: 30px;
  width: 50px;
  height: 50px;
}
.user_posted_message{
  width: auto;
  margin: 0 15px 15px 15px;
  border-bottom: 1px lightgray solid;
  padding-bottom: 15px;
}
.user_posted_message p{
  margin: 5px 0 15px 0
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
.button_post{
  display: flex;
  justify-content: center;
}
.button_post button{
  font-size: 15px;
  margin: 5px;
  padding: 10px;
  border-radius: 15px;
  background-color: white;
  font-weight: bold;
  box-shadow: 5px 5px 5px -2px rgba(0,0,0,0.35);
}
.form_post{
  display: flex;
  justify-content: center;
  height: 40px;
  margin: 15px;
  padding-bottom: 15px;
  border-bottom: 1px lightgray solid;
}
.form_post input{
  border: 1px solid rgba(0,0,0,0.35);
  box-shadow: 5px 5px 5px -2px rgba(0,0,0,0.35);
  border-radius: 13px;
  width: 30%;
  padding: 10px;
}
.user_comment{
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  border-bottom: 1px lightgray solid;
  margin: 15px;
}
.user_comment_info{
  display: flex;
  min-width: 25%;
}
.user_comment_info_img img{
  width: 50px;
  height: 50px;
  border-radius: 30px;
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
  .form_post input{
  width: auto;
  }
}
@media (max-width: 768px){
  .user_comment{
    flex-direction: column;
  }
  .user_comment_message{
    margin: 15px;
  }
}
</style>
