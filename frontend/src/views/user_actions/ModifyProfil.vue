<template>
    <section>
        <div>
            <p>{{user.userId}}</p>
            <p>Prénom : {{ firstName }}</p><input v-model="firstName" type="text" name="firstName" placeholder="">
            <p>Nom : {{ lastName }}</p><input v-model="lastName" type="text" name="lastName" placeholder="">
        </div>
        <button @click="modifyProfil">Valider</button>
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
            password: '',
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
                }
                axios.put(`http://localhost:3000/api/user/modifyUser/${this.user.userId}`, userModified, {headers: {'Authorization': `${localStorage.getItem('token')}`}})
                .then(res => {
                    if(res.status === 201){
                        this.$store.commit('SET_USER_FIRSTNAME', userModified.firstName)
                        this.$store.commit('SET_USER_LASTNAME', userModified.lastName)                          
                    } else {
                        err => {console.log(err.response)}
                    }
                })
            },
    }
}
</script>

<style scoped>

</style>
