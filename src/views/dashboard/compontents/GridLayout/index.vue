<template>
  <grid-layout
    :layout="layout"
    :col-num="24"
    :row-height="30"
    :is-draggable="true"
    :is-resizable="true"
    :is-mirrored="false"
    :vertical-compact="true"
    :margin="[10, 10]"
    :use-css-transforms="true"
    :auto-size="true"
    @layout-created="layoutCreatedEvent"
    @layout-before-mount="layoutBeforeMountEvent"
    @layout-mounted="layoutMountedEvent"
    @layout-ready="layoutReadyEvent"
    @layout-updated="layoutUpdatedEvent"
  >

    <grid-item
      v-for="item in layout"
      :key="item.i"
      :x="item.x"
      :y="item.y"
      :w="item.w"
      :h="item.h"
      :i="item.i"
      style="background-color: #f1f2f5"
      @resize="resizeEvent"
      @move="moveEvent"
      @resized="resizedEvent"
      @moved="movedEvent"
    >
      <div class="chart-container">
        <ChartCompose ref="chartboard" :class-name="item.className" :chart-data="lineChartData" height="100%" width="100%" />
      </div>
    </grid-item>
  </grid-layout>
</template>

<script>
import _ from 'lodash'
import VueGridLayout from 'vue-grid-layout'
import ChartCompose from '@/components/Charts/ChartCompose'
export default {
  name: 'Index',
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
    ChartCompose

  },
  data() {
    return {
      layout: [{
        i: '1',
        x: 0,
        y: 0,
        w: 12,
        h: 8,
        className: _.uniqueId('chart_')
      }, {
        i: '2',
        x: 12,
        y: 0,
        w: 12,
        h: 8,
        className: _.uniqueId('chart_')
      }],
      lineChartData: {
        expectedData: [100, 120, 161, 134, 105, 160, 165],
        actualData: [120, 82, 91, 154, 162, 140, 145]
      }
    }
  },
  methods: {
    layoutCreatedEvent: function(newLayout) {
      // console.log('Created layout: ', newLayout)
    },
    layoutBeforeMountEvent: function(newLayout) {
      // console.log('beforeMount layout: ', newLayout)
    },
    layoutMountedEvent: function(newLayout) {
      // console.log('Mounted layout: ', newLayout)
    },
    layoutReadyEvent: function(newLayout) {
      // console.log('Ready layout: ', newLayout)
    },
    layoutUpdatedEvent: function(newLayout) {
      // console.log('Updated layout: ', newLayout)
    },
    moveEvent: function(i, newX, newY) {
      // console.log('MOVE i=' + i + ', X=' + newX + ', Y=' + newY)
    },
    resizeEvent: function(i, newH, newW, newHPx, newWPx) {
      // console.log('RESIZE i=' + i + ', H=' + newH + ', W=' + newW + ', H(px)=' + newHPx + ', W(px)=' + newWPx)
    },
    movedEvent: function(i, newX, newY) {
      this.$nextTick(() => {
        if (this.$refs.chartboard) {
          this.$refs.chartboard.map((item) => {
            item.chart.resize()
          })
        }
      })
      // console.log('MOVED i=' + i + ', X=' + newX + ', Y=' + newY)
    },
    resizedEvent: function(i, newH, newW, newHPx, newWPx) {
      this.$nextTick(() => {
        if (this.$refs.chartboard) {
          this.$refs.chartboard.map((item) => {
            item.chart.resize()
          })
        }
      })
      // console.log('RESIZED i=' + i + ', H=' + newH + ', W=' + newW + ', H(px)=' + newHPx + ', W(px)=' + newWPx)
    }
  }
}
</script>

<style lang="scss" scoped>
.chart-container{
  position: relative;
  width: 100%;
  // height: calc(100vh - 84px);
  padding: 15px;
  height: 100%
}
</style>
