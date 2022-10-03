<template>
    <footer>
        <ul>
            <li><i class="fa-solid fa-ban"></i> Un problème lié à un utilisateur (contenu offensant ou inaproprié) ?</li>
            <li><i class="fa-solid fa-screwdriver-wrench"></i> Un problème lié au site ?</li>
            <li><i class="fa-solid fa-arrow-right"></i> Merci de contacter l'administrateur à cette <a href="mailto:#">adresse</a>.</li>
            <li><i class="fa-brands fa-twitter"></i><i class="fa-brands fa-instagram"></i><i class="fa-brands fa-linkedin"></i><i class="fa-brands fa-youtube"></i><i class="fa-brands fa-facebook"></i></li>
        </ul>
    </footer>
</template>

<script>
    export default {
        name: 'footer_component'
    }
</script>

<style>
    footer{
        width: 100%;
        background-color: #4E5166;
        border-radius: 50px 50px 0 0;
        margin-top: 10px;
    }
    ul{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    li{
        list-style: none;
        color: white;
        margin: 10px;
        width: 25%;
    }
    li a {
        text-decoration: none;
        color: white;
        font-style: italic;
        border-bottom: 1px solid white;
    }
    li i{
        margin: 3px;
    }
</style>