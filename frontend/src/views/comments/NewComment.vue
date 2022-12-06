<template>
    <div>
        <button @click="open = true" v-if="!open"><i class="fa-regular fa-comment"></i> Commenter</button>
        <input v-if="open" v-model="message" type="text" placeholder="Veuillez saisir votre commentaire">
            <button @click="newUserComment" v-if="(message.length > 0 && open)">publier</button>
            <button @click="open = false" v-if="open">annuler</button>
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

</style>