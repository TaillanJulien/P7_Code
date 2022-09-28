<template>
  <section class="user_post">
    <div class="user_post_info">
      <div class="user_post_info_img">
        <img src="../assets/photo_profil.jpg" alt="photo_moi">
      </div>
      <div class="user_post_info_name_timer">
        <p class="user_name">Julien Taillan</p>
        <p class="user_timer">Il y a "ici : timer"</p>
      </div>
    </div>
    <div class="user_posted_message">
      <p>There is dopesmoker</p>
      <div class="user_posted_message_img"><img src="../assets/imgimg.png" alt=""></div>
    </div>
    <div class="buttons">
      <button><i class="fa-regular fa-thumbs-up"></i> J'aime</button>
      <button><i class="fa-regular fa-comment"></i> Commenter</button>
    </div>
    <div class="form">
      <input type="text" placeholder="Veuillez saisir votre commentaire">
    </div>
    <div class="user_comment">
      <div class="user_comment_info">
        <div class="user_comment_info_img">
          <img src="../assets/photo_profil_2.jpg" alt="photo moi 2">
        </div>
        <div class="user_comment_info_name_timer">
          <p class="user_comment_name">Tulien Jaillan</p>
          <p class="user_comment_timer">Il y a "ici : timer"</p>
        </div>
      </div>
      <div class="user_comment_message">
          <p>Super album ! Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, fugit distinctio. Illum, enim quidem. Totam, possimus? Hic repellendus quisquam error autem rerum repudiandae natus in, expedita deleniti, culpa beatae veniam.</p>
        </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'post_component',
}
</script>

<style lang="scss">
.user_post{
  background-color: white;
  margin: 35px;
  width: 60%;
  display: flex;
  flex-direction: column;
  border-radius: 30px;
  box-shadow: 7px 9px 7px 1px rgba(0,0,0,0.76);
  transform: scale(1);
  transition: transform 500ms;
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
.user_posted_message_img{
  width: auto;
}
.user_posted_message_img img{
  width: 100%;
  object-fit: contain;
}
.buttons{
  display: flex;
  justify-content: center;
  margin: 0 0 5px 0;
}
.buttons button{
  font-size: 15px;
  margin: 5px;
  padding: 10px;
  border-radius: 50px;
  background-color: white;
  font-weight: bold;
}
.form{
  display: flex;
  justify-content: center;
  height: 40px;
  margin: 15px;
  padding-bottom: 15px;
  border-bottom: 1px lightgray solid;
}
.form input{
  outline: none;
  border: 1px solid black;
  border-radius: 40px;
  width: 25%;
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
</style>
