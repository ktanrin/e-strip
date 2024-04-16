<template>
  <div id="app">
    <EstripInterface />
    <Estrip/>
  </div>
</template>

<script>
import EstripInterface from './components/EstripInterface.vue'
import Estrip from './components/Estrip.vue'

export default {
  name: 'App',
  components: {
    EstripInterface,
    Estrip
  }
}
</script>

<style>
@import '~bulma/css/bulma.min.css';


</style>
