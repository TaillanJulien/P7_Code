<template>
  <div id="app">
    <header_component />
    <post_component />
    <signup_component />
  </div>
</template>

<script>
import post_component from './components/post_component.vue';
import header_component from './components/header_component.vue';
import signup_component from './components/signup_component.vue';

export default {
  name: 'App',
  components: {
    header_component,
    post_component,
    signup_component,
}
}
</script>

<style lang="scss">
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
