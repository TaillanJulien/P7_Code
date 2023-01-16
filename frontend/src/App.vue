<template>
  <main id="app">
    <NavBar />
    <router-view></router-view>
    <FooterComponent />
  </main>
</template>

<script>
import NavBar from './components/NavBar.vue';
import FooterComponent from './components/FooterComponent.vue';

export default {
  name: 'App',
  components: {
    NavBar,
    FooterComponent,
  }
}
</script>

<style>
body{
  margin: 0;
  padding: 0;
  background-color:  #FFD7D7;
  box-sizing: border-box;
  font-family: 'Inter Tight';
  height: 100vh;
}
#app{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100vh;
}
</style>
