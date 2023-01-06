<template>
    <section>
        <div>
            <p class="title">Que souhaitez-vous modifier ? <i class="fa-solid fa-pencil"></i></p>
            <p class="field">Prénom : {{ user.firstName }}</p><input v-model="firstName" type="text" name="firstName" placeholder="">
            <p class="field">Nom : {{ user.lastName }}</p><input v-model="lastName" type="text" name="lastName" placeholder="">
            <p class="field">Email : {{ user.email }}</p><input v-model="email" type="email" name="email" placeholder="">
            <form @submit.prevent="submit" enctype="multipart/form-data">
                <label for="file">Si vous le souhaitez, choisissez une nouvelle photo de profil !</label>
                <input ref="image" type="file" id="file" v-on:change="changeImg">
            </form>
            <button @click="modifyProfil" type="submit">Valider</button>
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
            image: '',
        }
    },
    computed: {
        ...mapGetters({
            user:"getUser"
        })
    },
    methods: {
        changeImg(){
            this.image = this.$refs.image.files[0];
        },
        modifyProfil(){
                let userModified = {
                    lastName: this.lastName.length ? this.lastName : this.user.lastName,
                    firstName: this.firstName ? this.firstName : this.user.firstName,
                    email: this.email ? this.email : this.user.email,
                    imageUrl: this.image ? this.iamge : this.user.imageUrl
                }
                const formData = new FormData();
                formData.append('lastName', userModified.lastName)
                formData.append('firstName', userModified.firstName)
                formData.append('email', userModified.email)
                if(this.image != '') {
                    formData.append('image', this.image, this.image.filename)
                }
                axios.put(`http://localhost:3000/api/user/modifyUser/${this.user.userId}`, formData, {headers: {'Authorization': `${localStorage.getItem('token')}`}})
                .then(res => {
                    console.log(res);
                    if(res.status === 201){
                        this.$store.commit('SET_USER_FIRSTNAME', userModified.firstName)
                        this.$store.commit('SET_USER_LASTNAME', userModified.lastName)
                        this.$store.commit('SET_USER_EMAIL', userModified.email)
                        this.$store.commit('SET_USER_IMAGEURL', userModified.imageUrl)
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
        margin: 15px;
    }
    input{
        border: 1px solid rgba(0,0,0,0.35);
        box-shadow: 5px 5px 5px -2px rgba(0,0,0,0.35);
        border-radius: 13px;
        padding: 5px;
        width: 80%;
    }
    form{
        font-weight: bold;
        align-self: flex-start;
        margin: 15px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    #file{
        background-color: white;
        margin: 15px;
        width: 45%;
        align-self: center;
    }
    label{
        font-weight: bold;
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
