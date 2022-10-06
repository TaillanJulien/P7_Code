<template>
    <section class="create_new_post">
        <p class="information_new_post">Qu'avez-vous à partager ? <i class="fa-solid fa-marker"></i></p>
        <input id="text_input" type="text" placeholder="Veuillez saisir votre texte ici">
        <div class="new_post_img">
            <p class="information_new_post">Une image à partager ? Cliquez sur le bouton juste en dessous ! <i class="fa-regular fa-image"></i></p>
            <input type="file">
        </div>
        <button class="valid_create_post">Partager <i class="fa-regular fa-circle-check"></i></button>
    </section>
</template>

<script>
    export default {
      name: 'create_post',
    }
    </script>

<style>
.create_new_post{
    background-color: white;
    margin: 15px;
    padding: 10px 10px 10px 10px;
    width: 30%;
    border-radius: 30px;
    box-shadow: 7px 9px 7px 1px rgba(0,0,0,0.76);
    display: flex;
    flex-direction: column;
    align-items: center;
}
.information_new_post{
    padding: 15px;
}
.create_new_post input{
    border: 1px solid rgba(0,0,0,0.35);
    box-shadow: 5px 5px 5px -2px rgba(0,0,0,0.35);
    border-radius: 13px;
    width: 80%;
    padding: 10px;
}
#text_input{
    margin-bottom: 25px;
}
.new_post_img{
    display: flex;
    flex-direction: column;
    align-items: center;
    border-top: 1px lightgray solid;
    border-bottom: 1px lightgray solid;
    padding-bottom: 25px;
}
.valid_create_post{
    margin: 15px;
    box-shadow: 5px 5px 5px -2px rgba(0,0,0,0.35);
    background-color: white;
    border-radius: 10px;
    padding: 8px;
}
@media (max-width: 992px){
    .create_new_post{
        width: 60%;
    }
}
@media (max-width: 768px){
    .create_new_post{
        width: 70%;
    }
}
</style>
