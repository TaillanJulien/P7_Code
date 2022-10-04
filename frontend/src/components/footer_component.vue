<template>
    <footer>
        <ul>
            <li><i class="fa-solid fa-ban"></i> Un problème lié à un utilisateur (contenu offensant ou inaproprié) ?</li>
            <li><i class="fa-solid fa-screwdriver-wrench"></i> Un problème lié au site ?</li>
            <li><i class="fa-solid fa-arrow-right"></i> Merci de contacter l'administrateur à cette <a href="mailto:#">adresse</a>.</li>
        </ul>
        <div class="external_link">
            <i class="fa-brands fa-twitter"></i><i class="fa-brands fa-instagram"></i><i class="fa-brands fa-linkedin"></i><i class="fa-brands fa-youtube"></i><i class="fa-brands fa-facebook"></i>
        </div>
    </footer>
</template>

<script>
    export default {
        name: 'footer_component'
    }
</script>

<style>
    footer{
        display: flex;
        width: 90%;
        background-color: #4E5166;
        border-radius: 50px 50px 0 0;
        margin-top: 10px;
    }
    ul{
        width: 70%;
    }
    li{
        list-style: none;
        color: white;
        margin: 10px;
        width: 50%;
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
    .external_link{
        width: 30%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 15px 15px 0;
    }
    .external_link i{
        font-size: 30px;
        margin: 5px;
        color: white;
    }
    @media (max-width: 768px){
        footer{
            flex-direction: column;
            align-items: center;
        }
        ul{
            padding: 0;
            width: 90%;
        }
    }
</style>