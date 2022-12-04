<template>
    <section>
        <div>
            <p>Prénom : {{ firstName }}</p><input v-model="firstName" type="text" placeholder="">
            <p>Nom : {{ lastName }}</p><input v-model="lastName" type="text" placeholder="">
            <p>Email : {{ email }}</p><input v-model="email" type="email" placeholder="">
            <p>Password : </p><input v-model="password" type="password">
        </div>
    </section>
</template>

<script>
// import axios from 'axios';
import { mapGetters } from 'vuex';

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
    // methods: {
    //     profilUpdate(){
    //         let newProfil = {
    //             userId: this.userId,
    //             firstName: '',
    //             lastName: '',
    //             email: '',
    //             password: ''
    //         }
    //         axios.put(`http://localhost:3000/api/user/modifyUser/${userId}`, newProfil)
    //         .then(res => {
    //             if(res.status === 200){
    //                 localStorage.setItem('newProfil', res.data.token)
    //                 this.$store.commit('SET_USER', res.data.newProfil)
    //                 this.$router.push('/all-posts');
    //                 console.log(res);
    //             } else {
    //                 err => {console.log(err)}
    //             }
    //         })
    //     }
    // }
}
</script>

<style scoped>

</style>
