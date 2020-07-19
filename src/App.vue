<template>
  <div id="app">
    <!-- <Calendar @change="change" @check="check" /> -->
    <div class="carousel-container">
      <div class="carousel-item" />
      <div class="carousel-item" />
      <div class="carousel-item" />
    </div>
  </div>
</template>

<script>
// import Calendar from '@/components/calendar'

export default {
  name: 'App',
  components: {
    // Calendar
  },
  methods: {
    change(e) {
      console.log(e)
    },
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
<style lang="scss">
.carousel-container{
  width: 300px;
  height: 300px;
  position: relative;
  .carousel-item{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    &:nth-child(1){
      background: #aaa;
    }
    &:nth-child(1){
      background: #ccc;
    }
    &:nth-child(1){
      background: #eee;
    }
  }
}
</style>
