<template>
    <section class="signup">
        <div class="signup_logo_title">
            <div class="signup_logo">
                <img src="../assets/groupomania_logo_2.png" alt="main logo groupomania">
            </div>
            <div class="signup_logo_title">
                <p>Pas encore de compte ? C'est ici que ça se passe ! <i class="fa-regular fa-hand-back-point-down"></i></p>
            </div>
        </div>
        <div class="form_inscription">
            <div class="form_inscription_complete_name">
                <input type="text" placeholder="Veuillez saisir votre nom">
                <input type="text" placeholder="Veuillez saisir votre prénom">
            </div>
            <div class="form_inscription_pass">
                <input type="text" placeholder="Veuillez saisir un mot de passe">
            </div>
            <div class="form_inscription_mail">
                <input type="text" placeholder="Veuillez saisir votre adresse mail">
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
    width: 50%;
    border-radius: 30px;
    background-color: white;
}
.signup_logo_title{
    width: 100%;
}
.signup_logo{
    width: auto;
}
.signup_logo img{
    width: 100%;
    object-fit: contain;
}
</style>