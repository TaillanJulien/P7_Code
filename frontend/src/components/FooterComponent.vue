<template>
    <div v-if="user === null || user.email == ''"></div>
    <footer v-else>
        <ul>
            <li><i class="fa-solid fa-ban"></i> Un problème lié à un utilisateur (contenu offensant ou inaproprié) ?</li>
            <li><i class="fa-solid fa-screwdriver-wrench"></i> Un problème lié au site ?</li>
            <li><i class="fa-solid fa-arrow-right"></i> Merci de contacter l'administrateur à cette <a href="mailto:#" tabindex="0">adresse</a>.</li>
        </ul>
        <div class="external_link">
            <a href="https://twitter.com/?lang=fr" target="_blank" tabindex="0"><i class="fa-brands fa-twitter"></i></a>
            <a href="https://www.instagram.com/?hl=fr" target="_blank" tabindex="0"><i class="fa-brands fa-instagram"></i></a>
            <a href="https://fr.linkedin.com/" target="_blank" tabindex="0"><i class="fa-brands fa-linkedin"></i></a>
            <a href="https://www.youtube.com/" target="_blank" tabindex="0"><i class="fa-brands fa-youtube"></i></a>
            <a href="https://www.facebook.com/" target="_blank" tabindex="0"><i class="fa-brands fa-facebook"></i></a>
        </div>
    </footer>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: 'FooterComponent',
        computed: {
            ...mapGetters({
                user: 'getUser'
            })
        }
    }
</script>

<style scoped>
    footer{
        display: flex;
        width: 90%;
        background-color: #4E5166;
        border-radius: 50px 50px 0 0;
        margin-top: 20px;
    }
    ul{
        width: 70%;
    }
    li{
        list-style: none;
        color: white;
        margin: 10px 10px 10px 0;
        width: 50%;
        white-space: nowrap;
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
    @media (max-width: 992px){
        footer{
            flex-direction: column;
            align-items: center;
            width: 100%;
        }
        ul{
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 0;
            width: 100%;
        }
        li{
            white-space: normal;
        }
    }
</style>