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
        padding: 15px;
        margin-bottom: 50px;
        border-radius: 0 0 50px 50px;
        width: 95%;
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
        margin-right: 10px;
    }
    nav a {
        color: white;
        text-decoration: none;
        margin: 10px;
        font-size: 20px;
    }
</style>