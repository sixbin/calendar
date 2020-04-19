<template>
  <div class="calendarContaner">
    <div v-for="item in weekTitles" :key="item" class="dayContainer weekTitle">{{ item }}</div>
    <div v-for="item in initialPosition" :key="'hide-'+item" class="dayContainer" />
    <div v-for="item in totalDays" :key="item" class="dayContainer oneday" @click="touchDay(item)">
      <div
        :class="['solar',isToday(item)?'today':'',checked===factory(item)?'active':'']"
        :style="`width:${size};height:${size};`"
      >{{ item }}</div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

export default {
  name: 'Calendar',
  props: {
    width: {
      type: String,
      default: '100%'
    },
    size: {
      type: String,
      default: '30px'
    },
    type: {
      type: String,
      default: 'month'
    }
  },
  data() {
    const today = moment()
    return {
      weekTitles: ['一', '二', '三', '四', '五', '六', '日'],
      oneday: today.format('YYYY-MM-DD'),
      checked: null
    }
  },
  computed: {
    initialPosition() {
      return moment(this.oneday).startOf('month').weekday()
    },
    totalDays() {
      return moment(this.oneday).daysInMonth()
    }
  },
  methods: {
    swiperleft() {
      this.oneday = moment(this.oneday).add(1, 'M').format('YYYY-MM-DD')
      console.log('左滑')
    },
    swiperright() {
      this.oneday = moment(this.oneday).add(-1, 'M').format('YYYY-MM-DD')
      console.log('右滑')
    },

    factory(item) {
      return moment(this.oneday).date(item).format('YYYY-MM-DD')
    },

    isToday(item) {
      return this.factory(item) === moment().format('YYYY-MM-DD')
    },
    touchDay(item) {
      const checked = this.factory(item)
      this.checked = checked
      console.log(checked)
    }
  }

}
</script>

<style scoped>
.calendarContaner{
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  box-sizing: border-box;
  padding: 0 1%;
}
.dayContainer{
  width: 14%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.weekTitle{
  line-height: 30px;
}
.oneday{
  box-sizing: border-box;
  padding: 5px;
}
.solar{
  box-sizing: border-box;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.today{
  color: #fff;
  background: #409EFF;
}
.active{
  border: 1px solid #C0C4CC;
}
</style>
