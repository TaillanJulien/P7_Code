<template>
    <section>
        <div>
            <p class="title">Que souhaitez-vous modifier ? <i class="fa-solid fa-pencil"></i></p>
            <p class="field">Prénom : {{ user.firstName }}</p><input v-model="firstName" type="text" name="firstName" placeholder="">
            <p class="field">Nom : {{ user.lastName }}</p><input v-model="lastName" type="text" name="lastName" placeholder="">
            <p class="field">Email : {{ user.email }}</p><input v-model="email" type="email" name="email" placeholder="">
            <button @click="modifyProfil">Valider</button>
        </div>
    </section>
</template>

<script>
// import axios from 'axios';
import { mapGetters } from 'vuex';
import axios from 'axios';

export default {
    name: 'ModifyProfil',
    data(){
        return {
            firstName: '',
            lastName: '',
            email: '',
        }
    },
    computed: {
        ...mapGetters({
            user:"getUser"
        })
    },
    methods: {
        modifyProfil(){
                let userModified = {
                    lastName: this.lastName,
                    firstName: this.firstName,
                    email: this.email
                }
                axios.put(`http://localhost:3000/api/user/modifyUser/${this.user.userId}`, userModified, {headers: {'Authorization': `${localStorage.getItem('token')}`}})
                .then(res => {
                    if(res.status === 201){
                        this.$store.commit('SET_USER_FIRSTNAME', userModified.firstName)
                        this.$store.commit('SET_USER_LASTNAME', userModified.lastName)
                        this.$store.commit('SET_USER_EMAIL', userModified.email)
                        this.$router.push('/all-posts')
                    } else {
                        err => {console.log(err.response)}
                    }
                })
            },
    }
}
</script>

<style scoped>
    div{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .title{
        background-color: white;
        border-radius: 10px;
        padding: 15px;
        box-shadow: 3px 5px 3px 0px rgba(0,0,0,0.76);
    }
    .field{
        font-weight: bold;
        align-self: flex-start;
    }
    input{
        border: 1px solid rgba(0,0,0,0.35);
        box-shadow: 5px 5px 5px -2px rgba(0,0,0,0.35);
        border-radius: 13px;
        padding: 5px;
        width: 80%;
    }
    button{
        margin: 20px;
        font-size: 15px;
        padding: 10px;
        border-radius: 15px;
        background-color: white;
        font-weight: bold;
        box-shadow: 5px 5px 5px -2px rgba(0,0,0,0.35);
        cursor: pointer;
    }
</style>
