<template>
  <div id="app">
    <Calendar />
  </div>
</template>

<script>
import Calendar from '@/components/calendar'

export default {
  name: 'App',
  components: {
    Calendar
  }
}
</script>

<style>
html,body{
  margin: 0;
  padding: 0;
  color: #2c3e50;
  font-size: 14px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
