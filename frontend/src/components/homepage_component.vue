<template>
    <div class="homepage">
        <h1>Bienvenue sur le réseau de ...</h1>
        <div class="homepage_img">
            <img src="../assets/groupomania_logo_4.png" alt="">
        </div>
        <div class="homepage_buttons">
            <button @click="login_page">Cliquez ici pour vous identifier.</button>
            <button @click="signup_page">Cliquez ici pour créer un nouveau compte.</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'homepage_component',
        methods: {
            signup_page(){
                window.location.href = "http://localhost:8080/signup"
            },
            login_page(){
                window.location.href = "http://localhost:8080/login"
            }
        }
    }
</script>

<style>
    .homepage{
        width: 30%;
        border-radius: 30px;
        background-color: white;
        padding: 20px;
        box-shadow: 7px 9px 7px 1px rgba(0,0,0,0.76);
        transform: scale(1);
        transition: transform 500ms;
        margin: 5px 20px 20px 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin: 0;
    }
    .homepage:hover{
        transform: scale(1.01);
    }
    h1{
        font-size: 25px;
        color: #FD2D01;
    }
    .homepage_img{
        width: auto;
    }
    .homepage_img img{
        width: 100%;
        object-fit: contain;
    }
    .homepage_buttons{
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
    }
    .homepage_buttons button{
        width: 70%;
        margin: 10px;
        box-shadow: 5px 5px 5px -2px rgba(0,0,0,0.35);
        background-color: white;
        border-radius: 10px;
        padding: 10px;
    }
    @media (max-width: 768px){
        .homepage{
            width: 60%;
        }
    }
</style>