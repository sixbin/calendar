<template>
  <div id="app">
    <Calendar @check="check" />
  </div>
</template>

<script>
import Calendar from '@/components/calendar'

export default {
  name: 'App',
  components: {
    Calendar
  },
  methods: {
    check(e) {
      console.log(e)
    }
  }
}
</script>

<style>
html,body{
  margin: 0;
  padding: 0;
  color: #2c3e50;
  font-size: 16px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}
#app{
  height: 100%;
}
</style>
