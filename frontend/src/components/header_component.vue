<template>
    <header>
        <div class="img"><a href="http://127.0.0.1:8080/all-post"><img src="../assets/groupomania_logo.png" alt="main logo groupomania"></a></div>
        <nav>
            <a href="#" @click="allPostPage">Accueil</a>
            <a href="#" @click="newPostPage">Nouveau post</a>
            <a href="#" @click="logout">Logout</a>
        </nav>
    </header>
</template>

<script>
    export default {
        name: 'header_component',
        methods: {
            logout(){
                confirm('Voulez-vous vraiment vous déconnecter ?')
                if(confirm) {
                    localStorage.removeItem("user")
                    this.$router.push('/');
                }              
            },
            newPostPage(){
                this.$router.push('/create-post');
            },
            allPostPage(){
                this.$router.push('/all-post');
            }
        }
    }
</script>

<style>
    header{
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        background-color: #FD2D01;
        padding: 18px;
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