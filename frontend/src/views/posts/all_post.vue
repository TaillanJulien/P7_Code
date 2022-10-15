<template>
<section class="post">
  <div class="user_post" v-for="post in posts" :key="post.message">
    <div class="user_post_info">
      <div class="user_post_info_img">
        <img src="../../assets/photo_profil.jpg" alt="photo_moi">
      </div>
      <div class="user_post_info_name_timer">
        <p class="user_name">user name</p>
        <p class="user_timer">Il y a "timer"</p>
      </div>
    </div>
    <div class="user_posted_message" >
      <p>{{post.message}}</p>
      <div class="user_posted_message_img"><img src="" alt=""></div>
    </div>
    <div class="button_post">
      <button><i class="fa-regular fa-thumbs-up"></i> J'aime</button>
      <button><i class="fa-regular fa-comment"></i> Commenter</button>
    </div>
    <div class="form_post">
      <input type="text" placeholder="Veuillez saisir votre commentaire">
    </div>
    <div class="user_comment">
      <div class="user_comment_info">
        <div class="user_comment_info_img">
          <img src="../../assets/photo_profil_2.jpg" alt="photo moi 2">
        </div>
        <div class="user_comment_info_name_timer">
          <p class="user_comment_name">Tulien Jaillan</p>
          <p class="user_comment_timer">Il y a "ici : timer"</p>
        </div>
      </div>
      <div class="user_comment_message">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, fugit distinctio. Illum, enim quidem. Totam, possimus? Hic repellendus quisquam error autem rerum repudiandae natus in, expedita deleniti, culpa beatae veniam. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam, in eum! Impedit provident deserunt quia. Atque quidem omnis repellat illo ea placeat fugiat eos saepe aliquam. Maiores beatae aut est?</p>
        </div>
    </div>
  </div>
</section>
</template> 

<script>
import axios from 'axios'

export default {
  name: 'all_post',
  data() {
    return {
      posts: [],
      users: []
    }
  },
  mounted () {
    axios.get ('http://localhost:3000/api/post/')
    .then(response => (this.posts = response.data))
    .catch(err => console.log(err));
    
    axios.get ('http://localhost:3000/api/user/getAllUsers/')
    .then(response => console.log(response))
    // .then(response => (this.users = response.data))
    .catch(err => console.log(err))
  }
}
</script>

<style>
.post{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.user_post{
  background-color: white;
  margin: 15px 35px 35px 35px;
  width: 60%;
  display: flex;
  flex-direction: column;
  border-radius: 30px;
  box-shadow: 7px 9px 7px 1px rgba(0,0,0,0.76);
  transform: scale(1);
  transition: transform 600ms;
}
.user_post:hover{
  transform: scale(1.01);
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
  margin: 0 15px 15px 15px;
  padding-bottom: 15px;
}
.user_comment_message p{
  padding: 10px;
  margin: 0;
  border-radius: 15px;
  background-color: lightgrey;
}
@media (max-width: 992px){
  .user_post{
    width: auto;
  }
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
