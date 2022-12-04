<template>
    <div>
        <button @click="open = true"> + </button>
    <section v-if="open" class="create_new_post">
        <button @click="open = false"> - </button>
        <p class="information_new_post">Qu'avez-vous à partager ? <i class="fa-solid fa-marker"></i></p>
        <input type="text" v-model="message" placeholder="Veuillez saisir votre texte ici">
        <div class="new_post_img">
            <p class="information_new_post">Une image à partager ? Cliquez sur le bouton juste en dessous ! <i class="fa-regular fa-image"></i></p>
            <input type="file">
        </div>
        <button class="valid_create_post" type="submit" @click="newUserPost">Partager <i class="fa-regular fa-circle-check"></i></button>
    </section>
    </div>
</template>

<script>
    import axios from 'axios';
    import { mapGetters } from 'vuex';

    export default {
    name: 'CreatePost',
    data () {
        return {
            message: '',
            open: false
        }
    },
    computed: {
        ...mapGetters({
            user: 'getUser'
        })
    },
    methods: {
        newUserPost(){
            let userPost = {
                userId: this.user.userId,
                message: this.message
            }
            axios.post('http://localhost:3000/api/post/', userPost, {headers: {'Authorization': `${localStorage.getItem('token')}`}})
            .then(res => {
                if(res.status === 201){
                    this.$emit('getPosts')
                } else {
                    err => {console.log(err.response)}
                }
            })
        }
    }
    }
</script>

<style>
.create_new_post{
    background-color: white;
    margin: 25px 0 25px 0;
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
#post{
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
