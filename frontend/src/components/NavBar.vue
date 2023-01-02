<template>
    <header v-if="user != null">
        <div class="img">
            <img src="../assets/groupomania_logo.png" alt="main logo groupomania">
        </div>
        <nav>
            <p v-if="$route.path != '/modify-profil'" class="initials" @click="modifyProfil">{{ user.firstName.charAt(0) + user.lastName.charAt(0)}}</p>
            <p v-if="$route.path != '/all-posts'" @click="allPostPage">Accueil</p>
            <p @click="logout">Logout</p>
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
                
                if(window.confirm('Voulez-vous vraiment vous déconnecter ?')) {
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
    nav p{
        color: white;
        text-decoration: none;
        margin: 10px;
        padding: 5px;
        font-size: 20px;
        transform: scale(1);
        transition: transform 300ms ease-out;
        cursor: pointer;
    }
    nav p:hover{
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
            justify-content: center;
        }
        nav a {
            margin: 5px;
        }
    }
</style>