<template>
    <section class="login">
        <div class="login_logo_title">
            <div class="login_logo">
                <img src="../../assets/groupomania_logo_2.png" alt="logo groupomania">
            </div>
        </div>
        <p class="information_login">Veuillez compléter les informations pour vous connecter :</p>
        <div class="form_login">
            <form>
                <div class="form_login_mail">
                    <label for="email">Adresse email :
                        <input tabindex="0" type="email" name="email" v-model="login.email" placeholder="Veuillez saisir votre adresse mail">
                    </label>
                </div>
                <p class="regexMail"></p>
                <div class="form_login_password">
                    <label for="password">Mot de passe :
                        <input tabindex="0" type="password" name="password" :submit="userLogin"  v-model="login.password" placeholder="Veuillez saisir un mot de passe">
                    </label>
                </div>
                <p class="regexPassword"></p>
            </form>
        </div>
        <div class="button_login">
            <button tabindex="0" class="button_connect" type="submit" @click="userLogin">Se connecter</button>
            <button tabindex="0" class="button_create_account" @click="signupPage">Créer un nouveau compte</button>
        </div>
        <div class="logo_end_login">
            <img src="../../assets/groupomania_graphic_logo.png" alt="logo">
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
                axios.post('http://localhost:3000/api/user/login', user)
                .then(res => {
                if (res.status === 200) {
                    localStorage.setItem('token', res.data.token);
                    this.$store.commit('SET_USER', res.data.user)
                    this.$router.push('/all-posts');
                } else {
                    err => {console.log("Impossible de se connecter" + err)}
                }
            })
        },
        signupPage(){
            this.$router.push('/signup')
            }
        },
    }
</script>

<style scoped>
.login{
    width: auto;
    border-radius: 30px;
    background-color: white;
    padding: 20px;
    box-shadow: 7px 9px 7px 1px rgba(0,0,0,0.76);
    transform: scale(1);
    transition: transform 500ms;
    margin: 100px 50px 50px 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
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
    .information_login{
    white-space: normal;
}

}
</style>