<template>

        <div class="container">
            <p>Oups... <i class="fa-solid fa-bomb"></i></p>
            <p>La page que vous recherchez n'existe pas ! </p>
            <button @click="allPost">Cliquez ici pour retourner à la page principale !</button>
        </div>
</template>

<script>
export default {
    name: 'PageError',
    methods: {
        allPost(){
            this.$router.push('/all-posts');
        }
    }

}
</script>

<style scoped>
.container{
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
    background-color: white;
    border-radius: 50px;
    padding: 50px;
    margin: 20px;
    box-shadow: 7px 9px 7px 1px rgba(0,0,0,0.76);
}
p{
    align-self: center;
    font-weight: bold;
    font-size: 15px;
}
button{
    font-size: 15px;
    margin: 5px;
    padding: 10px;
    border-radius: 15px;
    background-color: white;
    box-shadow: 5px 5px 5px -2px rgba(0,0,0,0.35);
    transform: scale(1);
    transition: transform 300ms ease-out;
    cursor: pointer;
}
button:hover{
    transform: scale(1.01);
}
</style>