<template>
    <section>
        <div class="homepage">
            <h1>Bienvenue sur ...</h1>
            <div class="homepage__img">
                <img src="../assets/groupomania_logo_4.png" alt="logo groupomania">
            </div>
            <div class="homepage__buttons">
                <button tabindex="0" @click="loginPage">Cliquez ici pour vous identifier.</button>
                <button tabindex="0" @click="signupPage">Cliquez ici pour créer un nouveau compte.</button>
            </div> 
        </div>
    </section>
</template>

<script>
    export default {
        name: 'HomeComponent',
        methods: {
            signupPage(){
                this.$router.push('/signup');
            },
            loginPage(){
                this.$router.push('/login');
            },
        }
    }
</script>

<style scoped>
@keyframes opacityAnim{
    0% {
        opacity: 0;
    }
    50%{
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
    section{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .homepage{
        width: 50%;
        border-radius: 30px;
        background-color: white;
        padding: 20px;
        box-shadow: 7px 9px 7px 1px rgba(0,0,0,0.76);
        transform: scale(1);
        transition: transform 500ms;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        animation: opacityAnim 400ms ease-in-out;
        animation-fill-mode: forwards;
    }
    
    .homepage:hover{
        transform: scale(1.01);
    }
    h1{
        margin: 13px;
        font-size: 23px;
        white-space: nowrap;
        color: #FD2D01;
    }
    .homepage__img{
        width: 50%;
    }
    .homepage__img img{
        width: 100%;
    }
    .homepage__buttons{
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
    }
    button{
        width: 70%;
        margin: 10px;
        box-shadow: 5px 5px 5px -2px rgba(0,0,0,0.35);
        background-color: white;
        border-radius: 10px;
        padding: 10px;
        cursor: pointer;
    }
    @media (max-width: 992px){
        .homepage{
            width: 80%;
        }
        .homepage__img{
            width: 50%;
        }
    }
    @media (max-width: 768px){
        .homepage{
            width: 90%;
            height: 50%;
            padding: 0;
            
        }
        .homepage__img{
            width: 65%;
        }
    }
</style>