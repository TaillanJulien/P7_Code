<template>
    <header>
        <div class="img"><img src="../assets/groupomania_logo.png" alt="main logo groupomania"></div>
        <nav>
            <a href="#">Accueil</a>
            <a href="#">Logout</a>
        </nav>
    </header>
</template>

<script>
    export default {
        name: 'header_component',
    }
</script>

<style>
    header{
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        background-color: #FD2D01;
        padding: 20px;
        margin-bottom: 20px;
        border-radius: 0 0 50px 50px;
        width: 90%;
    }
    .img{
        margin-left: 10px;
    }
    .img img{
        width: 250px;
    }
    nav{
        display: flex;
        justify-content: center;
    }
    nav a {
        color: white;
        text-decoration: none;
        margin: 10px;
        font-size: 20px;
    }
    @media (max-width: 992px){
        header{
            width: 90%;
            flex-direction: column;
            align-content: center;
        }
    }
    @media (max-width: 768px){
        header{
            width: 89%
        }
    }
</style>