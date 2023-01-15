<template>
    <section class="create_new_post">
        <div class="buttons">
            <button tabindex="0" v-if="!open" class="open-close_button" @click="open = true">{{ user.firstName }}, quelque chose à partager ?</button>
            <button tabindex="0" v-if="open" class="open-close_button" @click="(open = false, message = '')"> Cliquez-ici pour annuler </button>
        </div>
        <div v-if="open" class="new_post">
                <p>Que souhaitez-vous partager ?</p>
                <input tabindex="0" id="postText" type="text" v-model="message" placeholder="Veuillez saisir le contenu de votre post">         
                    <div class="new_post_img">
                        <form @submit.prevent="submit" enctype="multipart/form-data">
                            <label for="file">Veuillez sélectionner une photo !</label>
                            <input ref="image" type="file" id="file">
                        </form>
                    </div>  
                <button tabindex="0" v-if="this.message != '' || this.image != null" @click="newUserPost" class="valid_create_post" type="submit">Partager <i class="fa-regular fa-circle-check"></i></button>
                <button tabindex="0" v-else class="valid_create_post" disabled>Partager</button>
        </div>
    </section>
</template>

<script>
    import axios from 'axios';
    import { mapGetters } from 'vuex';

    export default {
    name: 'CreatePost',
    data () {
        return {
            image: null,
            message: '',
            open: false,  
        }
    },
    computed: {
        ...mapGetters({
            user: 'getUser'
        })
    },
    methods: {
        newUserPost(){
            this.image = this.$refs.image.files[0];
            const formData = new FormData();
            formData.append('message', this.message)
            formData.append('userId', this.user.userId)
            if(this.image != null) {
                formData.append('image', this.image, this.image.filename)
            }
            axios.post('http://localhost:3000/api/post/', formData, {headers: {Authorization: localStorage.getItem('token')}})
            .then(res => {
                if(res.status === 201){
                    this.$emit('getPosts')
                    this.open = false
                    this.message = ''
                } else {
                    err => {console.log(err.response)}
                }
            })
        },
    }
    }
</script>

<style scoped>
    @keyframes opacityAnim{
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
.buttons{
    display: flex;
    justify-content: center;
    width: auto;
}
.open-close_button{
    font-size: 15px;
    margin: 5px;
    padding: 10px;
    border-radius: 15px;
    background-color: white;
    font-weight: bold;
    box-shadow: 5px 5px 5px -2px rgba(0,0,0,0.35);
    transform: scale(1);
    transition: transform 300ms ease-out;
    cursor: pointer;
}
.open-close_button:hover{
    transform: scale(1.04);
}
.create_new_post{
    width: 50%;
}
.new_post{
    background-color: white;
    margin: 25px 0 25px 0;
    padding: 10px 10px 10px 10px;
    border-radius: 30px;
    box-shadow: 7px 9px 7px 1px rgba(0,0,0,0.76);
    display: flex;
    flex-direction: column;
    align-items: center;
    animation: opacityAnim 1500ms;
}
.new_post p {
    margin: 10px 0 5px 0;
}
#postText{
    border: 1px solid rgba(0,0,0,0.35);
    box-shadow: 5px 5px 5px -2px rgba(0,0,0,0.35);
    border-radius: 13px;
    width: 80%;
    padding: 10px;
    margin: 10px 0 20px 0;
}
#postImg{
    margin: 10px 0 5px 0;
}
.new_post_img{
    border-top: 1px lightgray solid;
    border-bottom: 1px lightgray solid;
    padding-bottom: 15px;
}
label{
    margin: 5px;
}
form{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 10px;
}
.valid_create_post{
    font-size: 15px;
    margin: 15px;
    padding: 10px;
    border-radius: 15px;
    background-color: white;
    font-weight: bold;
    box-shadow: 5px 5px 5px -2px rgba(0,0,0,0.35);
    transform: scale(1);
    transition: transform 300ms ease-out;
    cursor: pointer;
    animation: opacityAnim 1000ms;
}
.valid_create_post:hover{
    transform: scale(1.04);
}
.valid_create_post i{
    color: green;
}
@media (max-width: 992px){
    .create_new_post{
        width: 60%;
    }
}
@media(max-width: 768px){
    .create_new_post{
        width: 85%;
    }
}
</style>
