<template>
    <header v-if="user != null">
        <div class="img"><img src="../assets/groupomania_logo.png" alt="main logo groupomania"></div>
        <div class="initials_container">
            <p>Bienvenue {{ user.firstName.charAt(0) + user.lastName.charAt(0)}} !</p>
        </div>
        <nav>
            <a href="" @click="allPostPage">Accueil</a>
            <a href="" @click="modifyProfil">Profil</a>
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
                    localStorage.removeItem("user")
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
    .img{
        margin-left: 10px;
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
        font-size: 20px;
    }
    .initials_container{
        background-color: white;
        padding: 5px;
        border-radius: 40%;
        font-size: 20px;
    }
    .initials_container p{
        color: #FD2D01;
    }
    @media (max-width: 992px){
        header{
            
            flex-direction: column;
            align-content: center;
        }
    }
</style>