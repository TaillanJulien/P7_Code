<template>
    <section class="login">
        <div class="login_logo_title">
            <div class="login_logo">
                <img src="../assets/groupomania_logo_2.png" alt="main logo groupomania">
            </div>
        </div>
        <div class="form_login">
            <div class="form_login_mail">
                <label for="mail">Adresse email :
                    <input type="text" placeholder="Veuillez saisir votre adresse mail">
                </label>
            </div>
            <div class="form_login_password">
                <label for="password">Mot de passe :
                    <input type="text" placeholder="Veuillez saisir un mot de passe">
                </label>
            </div>
        </div>
        <div class="button_login">
            <button class="button_connect">Se connecter</button>
            <button class="button_create_account">Créer un nouveau compte</button>
        </div>
        <div class="logo_end_login">
            <img src="../assets/groupomania_graphic_logo.png" alt="logo">
        </div>
    </section>
</template>

<script>
    export default {
        name: 'login_component'
    }
</script>

<style>
.login{
    width: 25%;
    border-radius: 30px;
    background-color: white;
    padding: 20px;
    box-shadow: 7px 9px 7px 1px rgba(0,0,0,0.76);
    transform: scale(1);
    transition: transform 500ms;
    margin: 20px;
}
.login:hover{
    transform: scale(1.01);
}
.login_logo{
    width: 80%;
}
.login_logo img{
    width: 100%;
    object-fit: contain;
    border-radius: 30px;
}
.login_logo_title{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.form_login label{
    color: red;
    width: 30%;
    font-weight: bold;
    font-style: i;
}
.form_login input{
    display: flex;
    border-radius: 30px;
    width: 60%;
    margin: 10px;
    padding: 5px;
}
.logo_end_login{
    width: 100%;
    display: flex;
    justify-content: center;
}
.logo_end_login img{
    width: auto;
    object-fit: contain;
}
.button_login{
    padding: 15px;
    display: flex;
    justify-content: center;
}
.button_create_account, .button_connect{
    width: 30%;
    margin: 10px;
    box-shadow: 5px 5px 5px -2px rgba(0,0,0,0.35);
    background-color: white;
    border-radius: 10px;
    padding: 5px;
}
</style>