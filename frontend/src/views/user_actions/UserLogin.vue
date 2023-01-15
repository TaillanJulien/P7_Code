<template>
    <section>
        <div class="login">
            <div class="login_logo_title">
                <div class="login_logo">
                    <img src="../../assets/groupomania_logo_2.png" alt="logo groupomania">
                </div>
            </div>
            <p class="information_login">Veuillez compléter les informations pour vous connecter :</p>
            <div class="form_login">
                <form action="post">
                    <div class="form_login_mail">
                        <label for="email">Adresse email :
                            <input @keyup.enter="userLogin" tabindex="0" type="email" name="email" v-model="login.email" placeholder="Veuillez saisir votre adresse mail">
                            <p id="invalidFormat"></p>
                        </label>
                    </div>
                    <div class="form_login_password">
                        <label for="password">Mot de passe :
                            <input @keyup.enter="userLogin" tabindex="0" type="password" name="password" :submit="userLogin"  v-model="login.password" placeholder="Veuillez saisir un mot de passe">
                        </label>
                    </div>
                </form>
            </div>
            <div class="button_login">
                <button tabindex="0" class="button_connect" type="submit" @click="userLogin" >Se connecter</button>
                <button tabindex="0" class="button_create_account" @click="signupPage">Créer un nouveau compte</button>
            </div>
            <div class="logo_end_login">
                <img src="../../assets/groupomania_graphic_logo.png" alt="logo groupomania">
            </div>
        </div>
    </section>
</template>

<script>
import axios from 'axios'

export default {
    name: 'UserLogin',
        data (){
            return {
                login: {
                    email: "",
                    password: "",
                }
            };
        },
    methods: {   
        userLogin(){
            let user = {
                email: this.login.email,
                password: this.login.password,
            }
            let emailRegEx = /^[A-Za-z0-9\-.]+@([A-Za-z0-9-]+\.)+[A-Za-z0-9-]{2,}$/;
            if(emailRegEx.test(this.login.email) === false){
                document.querySelector('#invalidFormat').innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Format incorrect'    
            } else {
                axios.post('http://localhost:3000/api/user/login', user)
                .then(res => {
                if (res.status === 200) {
                    localStorage.setItem('token', res.data.token);
                    this.$store.commit('SET_USER', res.data.user)
                    this.$router.push('/all-posts');
                    return
                }
            })
                .catch(err => {
                    console.log('Impossible de se connecter : ' + err), 
                    alert('Email ou mot de passe incorrect')
                })
            }
        },
        signupPage(){
            this.$router.push('/signup')
            }
        },
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
section{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.login{
    width: auto;
    border-radius: 30px;
    background-color: white;
    padding: 20px;
    box-shadow: 7px 9px 7px 1px rgba(0,0,0,0.76);
    transform: scale(1);
    transition: transform 500ms;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    animation: opacityAnim 400ms ease-in-out;
    animation-fill-mode: forwards;
}
.login:hover{
    transform: scale(1.01);
}
.login_logo{
    width: 80%;
    margin: 10px;
}
.login_logo img{
    width: 100%;
}
.login_logo_title{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.information_login{
    white-space: nowrap;
}
.form_login label{
    color: red;
    width: 30%;
    font-weight: bold;
}
.form_login{
    width: 80%;
}
.form_login input{
    display: flex;
    border-radius: 30px;
    width: 80%;
    margin: 10px;
    padding: 5px;
}
#invalidFormat{
    font-weight: 500;
    font-style: italic;
    color: #9c941f;
    width: auto;
}
.button_login{
    padding: 15px;
    display: flex;
    justify-content: center;
}
.button_create_account, .button_connect{
    width: 50%;
    margin: 10px;
    box-shadow: 5px 5px 5px -2px rgba(0,0,0,0.35);
    background-color: white;
    border-radius: 10px;
    padding: 8px;
    cursor: pointer;
}
.logo_end_login{
    width: 100%;
    display: flex;
    justify-content: center;
}
.logo_end_login img{
    width: auto;
}
@media (max-width: 768px){
    .login{
    margin: 10px;
    height: auto;
    }
    .information_login{
    white-space: normal;
}
}
</style>