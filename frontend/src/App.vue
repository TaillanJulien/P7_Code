<template>
  <main id="app">
    <header_component />
    <router-view></router-view>
    <footer_component />
  </main>
</template>

<script>
import header_component from './components/header_component.vue';
import footer_component from './components/footer_component.vue';



export default {
  name: 'App',
  components: {
    header_component,
    footer_component,
}
}
</script>

<style>
body{
  margin: 0;
  background-color:  #FFD7D7;
  box-sizing: border-box;
  font-family: 'Inter Tight'
}
#app{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
