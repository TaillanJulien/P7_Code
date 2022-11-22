<template>
    <div class="container">
        <p>La page que vous recherchez est inexistante</p>
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
    width: 100%;
    display: flex;
    justify-content: center;
    align-content: center;
}
</style>