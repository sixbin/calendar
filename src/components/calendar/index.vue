<template>
  <div class="bb-calendar">
    <div class="bb-week-title">
      <div v-for="item in weekTitles" :key="item" class="bb-week-title-item">{{ item }}</div>
    </div>

    <div class="bb-day-container">
      <div
        v-for="(item,index) in PrevMonthFillSum"
        :key="'prev-'+index"
        class="bb-day bb-prev-day"
        :style="{ height:Height }"
        @click="prevMonth"
      >
        <slot :day="factory((PrevMonthMax - PrevMonthFillSum + item),-1)">
          <div class="bb-oneday">{{ PrevMonthMax - PrevMonthFillSum + item }}</div>
        </slot>
      </div>
      <div
        v-for="(item,index) in MonthSum"
        :key="index"
        class="bb-day"
        :style="{ height:Height }"
        @click="handleOneday(item)"
      >
        <slot :day="factory(item)">
          <div
            :class="[
              'bb-oneday',
              checked===factory(item)?'bb-checked':'',
              isToday(item)?'bb-today':''
            ]"
          >
            {{ item }}
          </div>
        </slot>
      </div>
      <div
        v-for="(item,index) in NextMonthFillSum"
        :key="'next'+index"
        class="bb-day bb-next-day"
        :style="{ height:Height }"
        @click="nextMonth"
      >
        <slot :day="factory(item,1)">
          <div class="bb-oneday">{{ item }}</div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Calendar',
  props: {
    type: {
      type: String,
      default: 'month'
    },
    startWeek: {
      type: Number,
      default: 0
    },
    format: {
      type: String,
      default: 'YYYY-MM-DD'
    }
  },
  data() {
    const week = '日一二三四五六'
    return {
      weekTitles: week.split('').slice(this.startWeek)
        .concat(week.split('').slice(0, this.startWeek)),
      oneday: this.$moment(),
      checked: null
    }
  },
  computed: {
    PrevMonthMax() { // 上月几天
      return this.$moment(this.oneday).subtract('month', 1).daysInMonth()
    },
    MonthSum() { // 本月几天
      return this.$moment(this.oneday).daysInMonth()
    },
    PrevMonthFillSum() { // 本月前填充几天
      return this.$moment(this.oneday).startOf('month').day() - this.startWeek
    },
    NextMonthFillSum() { // 本月后填充几天
      return 6 - this.$moment(this.oneday).endOf('month').day() + this.startWeek
    },
    AllSum() { // 视图中共几天
      return this.MonthSum + this.PrevMonthFillSum + this.NextMonthFillSum
    },
    Height() { // 每天高度
      return parseInt(100 / (this.AllSum / 7)) + '%'
    }
  },
  methods: {
    /**
     * 上一月
     */
    prevMonth() {
      this.oneday = this.$moment(this.oneday).add(-1, 'M')
      this.switchoverMonth()
    },
    /**
     * 下一月
     */
    nextMonth() {
      this.oneday = this.$moment(this.oneday).add(1, 'M')
      this.switchoverMonth()
    },
    /**
     * 返回当月
     */
    backToday() {
      this.checked = null
      this.oneday = this.$moment()
      this.switchoverMonth()
    },
    /**
     * 格式化时间
     */
    factory(e, step = 0) {
      return this.$moment(this.oneday).add(step, 'M').date(e).format(this.format)
    },
    /**
     * 是否当天e
     */
    isToday(e) {
      return this.factory(e) === this.$moment().format(this.format)
    },
    /**
     * 点击某天
     */
    handleOneday(e) {
      const checked = this.factory(e)
      this.checked = checked
      this.$emit('check', checked)
    },
    /**
     * 切换月
     */
    switchoverMonth() {
      const e = this.$moment(this.oneday).format('YYYY-MM')
      this.$emit('change', e)
    }
  }

}
</script>

<style lang="scss" scoped>
.bb-calendar{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .bb-week-title{
    padding: 0 1%;
    height: 30px;
    flex-shrink: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    &-item{
      flex: 1;
      text-align: center;
    }
  }

  .bb-day-container{
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    position: relative;
    .bb-day{
      width: 14%;
      .bb-oneday{
        margin: auto;
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border-radius: 50%;
      }
      .bb-checked{
        color: #fff;
        background: #c0c4cc;
      }
      .bb-today{
        color: #fff;
        background: #4f83fd;
      }
    }
    .bb-prev-day,
    .bb-next-day{
      color: #c0c4cc;
    }
  }
}
</style>
