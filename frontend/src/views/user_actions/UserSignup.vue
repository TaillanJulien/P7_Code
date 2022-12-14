<template>
    <section class="signup">
        <div class="signup_logo_title">
            <div class="signup_logo">
                <img src="../../assets/groupomania_logo_2.png" alt="logo groupomania">
            </div>
            <div class="signup_logo_title">
                <p>Pas encore de compte ? Vous êtes au bon endroit !</p>
            </div>
        </div>
        <div class="form_inscription">
            <div class="form_inscription_input">
                <label for="lastName">Nom :
                    <input tabindex="0" type="text" name="lastName" v-model="lastName" placeholder="Veuillez saisir votre nom">
                </label>
            </div>
            <div class="form_inscription_input">
                <label for="firstName">Prénom :
                    <input tabindex="0" type="text" name="firstName" v-model="firstName" placeholder="Veuillez saisir votre prénom">
                </label>
            </div>
            <div class="form_inscription_input">
                <label for="password">Mot de passe :
                    <input tabindex="0" type="password" name="password" v-model="password" placeholder="Veuillez saisir un mot de passe">
                </label>
            </div>
            <div class="form_inscription_input">
                <label for="mail">Adresse email :
                    <input tabindex="0" type="email" name="email" v-model="email" placeholder="Veuillez saisir votre email">
                </label>
            </div>
            <div class="form_inscription_input">
                <label for="picture"> Veuillez choisir une photo de profil :
                    <input tabindex="0" type="image" name="avatar">
                </label>
            </div>
            <div class="signup_button">
                <button tabindex="0" class="user_signup" @click="userSignup">Cliquez ici pour vous enregistrer</button>
            </div>
        </div>
        <div class="redirection_link">
            <p>Vous avez déjà un compte ? <a href="" tabindex="0" @click="loginPage">Rendez-vous sur cette page.</a></p>
        </div>
        <div class="logo_end">
            <img src="../../assets/groupomania_graphic_logo.png" alt="logo">
        </div>
    </section>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'UserSignup',
        data (){
            return {
                lastName: '',
                firstName: '',
                email: '',
                password: '',
            }
        },
        methods: {
            userSignup(){
                let newUser = {
                    lastName: this.lastName,
                    firstName: this.firstName,
                    email: this.email,
                    password: this.password,
                    url: this.url
                }
                axios.post ('http://localhost:3000/api/user/signup', newUser, {headers: {'Authorization': `${localStorage.getItem('token')}`}})
                .then(this.$router.push('/login'), err => {console.log(err.response)})
            },
            loginPage(){
                this.$router.push('/login')
            }
        }
    }
</script>

<style scoped>
.signup{
    width: auto;
    border-radius: 30px;
    background-color: white;
    padding: 20px;
    box-shadow: 7px 9px 7px 1px rgba(0,0,0,0.76);
    transform: scale(1);
    transition: transform 500ms;
    margin: 50px 30px 15px 30px;
}
.signup:hover{
    transform: scale(1.01);
}
.signup_logo{
    width: 80%;
}
.signup_logo img{
    width: 100%;
    object-fit: contain;
    border-radius: 30px;
}
.signup_logo_title{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.form_inscription label{
    color: red;
    width: 20%;
    font-weight: bold;
}
.form_inscription input{
    display: flex;
    border-radius: 30px;
    width: 70%;
    margin: 10px;
    padding: 5px;
}
.user_signup{
    width: 50%;
    margin: 10px;
    box-shadow: 5px 5px 5px -2px rgba(0,0,0,0.35);
    background-color: white;
    border-radius: 10px;
    padding: 8px;
    cursor: pointer;
}
.signup_button{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.redirection_link{
    display: flex;
    justify-content: center;
}
.redirection_link p{
    font-size: 100%;
    white-space: none;
}
.redirection_link a{
    text-decoration: none;
    color: black;
    font-style: italic;
    border-bottom: 1px solid black;
}
.logo_end{
    width: 100%;
    display: flex;
    justify-content: center;
}
.logo_end img{
    width: auto;
    object-fit: contain;
}
@media (max-width: 768px){
    .redirection_link p{
        white-space: normal;
    }
}
</style>