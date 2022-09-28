<template>
    <section class="signup">
        <div class="signup_logo_title">
            <div class="signup_logo">
                <img src="../assets/groupomania_logo_2.png" alt="main logo groupomania">
            </div>
            <div class="signup_logo_title">
                <p>Pas encore de compte ? Vous êtes au bon endroit ! </p>
            </div>
        </div>
        <div class="form_inscription">
            <div class="form_inscription_name">
                <label for="name">Nom :
                    <input type="text" placeholder="Veuillez saisir votre nom">
                </label>
                <label for="surname">Prénom :
                    <input type="text" placeholder="Veuillez saisir votre prénom">
                </label>
            </div>
            <div class="form_inscription_password">
                <label for="password">Mot de passe :
                    <input type="text" placeholder="Veuillez saisir un mot de passe">
                </label>
            </div>
            <div class="form_inscription_mail">
                <label for="mail">Adresse email :
                    <input type="text" placeholder="Veuillez saisir votre adresse mail">
                </label>
            </div>
        </div>
        <div class="redirection_link">
            <p>Vous avez déjà un compte ? <a href="#">Rendez-vous sur cette page</a></p>
        </div>
    </section>
</template>

<script>
    export default {
        name: 'signup_component'
    }
</script>

<style lang="scss">
.signup{
    width: 25%;
    border-radius: 30px;
    background-color: white;
    padding: 15px;
}
.signup_logo{
    width: auto;
}
.signup_logo img{
    width: 100%;
    object-fit: contain;
    border-radius: 30px;
}
.form_inscription_name label{
    padding: 30px;
}
</style>