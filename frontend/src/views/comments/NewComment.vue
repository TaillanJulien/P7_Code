<template>
    <div class="container">
        <button tabindex="0" @click="open = true" v-if="!open"><i class="fa-regular fa-comment"></i></button>
        <input tabindex="0" v-if="open" v-model="message" type="text" placeholder="Veuillez saisir votre commentaire">
            <button class="animButton" tabindex="0" @click="newUserComment" v-if="(message.length > 0 && open)">Publier <i class="fa-regular fa-circle-check" id="icon_colored"></i></button>
            <button tabindex="0" @click="open = false" v-if="open">Annuler</button>
    </div>
</template>

<script>
    import axios from 'axios';
    import { mapGetters } from 'vuex';

    export default {
        name: 'NewComment',
        data() {
            return {
                message: '',
                open: false
            }
        },
        props: {
            postId: String
        },
        computed: {
            ...mapGetters({
                user: 'getUser'
            })
        },
        methods: {
            newUserComment(){
                if(this.message.length > 0){
                    let userComment = {
                        postId: this.postId,
                        userId: this.user.userId,
                        message: this.message
                    }
                    axios.post(`http://localhost:3000/api/comments/${this.postId}`, userComment, {headers: {Authorization: localStorage.getItem('token')}})
                    .then(res => {
                        if(res.status === 201){
                            this.open = false
                            this.message = ""
                            this.$emit('getComments')
                        } else {
                            err => {console.log(err.response)}
                        }
                    })
                }
            }
        }
    }
</script>

<style scoped>
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
.container{
    display: flex;
    align-content: center;
    flex-direction: column;
}
.animButton{
    overflow: hidden;
    animation: opacityAnim 500ms ease-in-out;
    animation-fill-mode: forwards;
}
button{
    font-size: 15px;
    margin: 5px;
    padding: 10px;
    border-radius: 15px;
    background-color: white;
    font-weight: bold;
    box-shadow: 5px 5px 5px -2px rgba(0,0,0,0.35);
}
input{
    border: 1px solid rgba(0,0,0,0.35);
    box-shadow: 5px 5px 5px -2px rgba(0,0,0,0.35);
    border-radius: 13px;
    padding: 10px;
    margin: 5px;
}
#icon_colored{
    color: green;
}
i {
    font-size: 20px;
}
</style>