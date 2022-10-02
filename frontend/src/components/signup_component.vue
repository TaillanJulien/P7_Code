<template>
    <section class="signup">
        <div class="signup_logo_title">
            <div class="signup_logo">
                <img src="../assets/groupomania_logo_2.png" alt="main logo groupomania">
            </div>
            <div class="signup_logo_title">
                <p>- Pas encore de compte ? Vous êtes au bon endroit ! -</p>
            </div>
        </div>
        <div class="form_inscription">
            <div class="form_inscription_input">
                <label for="name">Nom :
                    <input type="text" placeholder="Veuillez saisir votre nom">
                </label>
            </div>
            <div class="form_inscription_input">
                <label for="surname">Prénom :
                    <input type="text" placeholder="Veuillez saisir votre prénom">
                </label>
            </div>
            <div class="form_inscription_input">
                <label for="password">Mot de passe :
                    <input type="text" placeholder="Veuillez saisir un mot de passe">
                </label>
            </div>
            <div class="form_inscription_input">
                <label for="mail">Adresse email :
                    <input type="text" placeholder="Veuillez saisir votre adresse mail">
                </label>
            </div>
        </div>
        <div class="redirection_link">
            <p>- Vous avez déjà un compte ? <a href="#">Rendez-vous sur cette page.</a> -</p>
        </div>
        <div class="logo_end">
            <img src="../assets/groupomania_graphic_logo.png" alt="logo">
        </div>
    </section>
</template>

<script>
    export default {
        name: 'signup_component'
    }
</script>

<style>
.signup{
    width: 25%;
    border-radius: 30px;
    background-color: white;
    padding: 20px;
    box-shadow: 7px 9px 7px 1px rgba(0,0,0,0.76);
    transform: scale(1);
    transition: transform 500ms;
    margin: 30px;
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
    width: 60%;
    margin: 10px;
    padding: 5px;
}
.redirection_link{
    display: flex;
    justify-content: center;
}
.redirection_link p{
    font-size: 15px;
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
</style>