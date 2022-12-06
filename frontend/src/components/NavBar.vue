<template>
    <header v-if="user != null">
        <div class="img">
            <img src="../assets/groupomania_logo.png" alt="main logo groupomania">
        </div>
        <nav>
            <a href="" class="initials" @click="modifyProfil">{{ user.firstName.charAt(0) + user.lastName.charAt(0)}}</a>
            <a href="" @click="allPostPage">Accueil</a>
            <a href="" @click="logout">Logout</a>
        </nav>
    </header>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: 'NavBar',
        computed:{
            ...mapGetters({
            user: 'getUser'
            })
        },
        methods: {
            logout(){
                confirm('Voulez-vous vraiment vous déconnecter ?')
                if(confirm) {
                    localStorage.removeItem("token")
                    this.$store.commit("SET_USER", null) 
                    this.$router.push('/');
                }              
            },
            modifyProfil(){
                this.$router.push('/modify-profil');
            },
            allPostPage(){
                this.$router.push('/all-posts');
            }
        }
    }
</script>

<style scoped>
    header{
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        background-color: #FD2D01;
        padding: 18px;
        margin-bottom: 20px;
        border-radius: 0 0 50px 50px;
        width: 89%;
    }
    .img img{
        width: 250px;
    }
    nav{
        display: flex; 
    }
    nav a{
        color: white;
        text-decoration: none;
        margin: 10px;
        padding: 5px;
        font-size: 20px;
        transform: scale(1);
        transition: transform 300ms ease-out;
    }
    nav a:hover{
        transform: scale(1.08);
    }
    .initials{
        background-color: white;
        color: red;
        border-radius: 50px;
    }
    @media (max-width: 992px){
        header{  
            flex-direction: column;
            align-content: center;
        }
    }
    @media (max-width: 768px){
        nav{
            margin-left: 20px;
        }
        nav a {
            margin: 5px;
        }
    }
</style>