<template>
  <div class="createPost-container">
    <sticky :z-index="10" :class-name="'sub-navbar draft'">
      <el-button class="pan-btn blue-btn">
        新增看板
      </el-button>
      <el-button class="pan-btn green-btn" @click="skip">
        看板库
      </el-button>
    </sticky>
    <div class="createPost-main-container">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane :lazy="true" label="用户管理" name="first"><GridLayout /></el-tab-pane>
        <el-tab-pane :lazy="true" label="配置管理" name="second"><GridLayout /></el-tab-pane>
        <el-tab-pane :lazy="true" label="角色管理" name="third"><GridLayout /></el-tab-pane>
        <el-tab-pane :lazy="true" label="定时任务补偿" name="fourth"><GridLayout /></el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import Sticky from '@/components/Sticky'
import GridLayout from './compontents/GridLayout'
export default {
  name: 'Index',
  components: { Sticky, GridLayout },
  data() {
    return {
      activeName: 'first'
    }
  },
  mounted() {

  },
  methods: {
    skip() {
      this.$router.push('/dashboard/kanbanList')
    },
    handleClick(tab, event) {
      // console.log(tab, event)
      setTimeout(() => {
        tab.$children.forEach(item => {
          item.$refs.chartboard.forEach(res => {
            if (res.chart) {
              res.chart.resize()
            }
          })
        })
      }, 100)
    }
  }
}
</script>

<style lang="scss" scoped>
.createPost-container {
  position: relative;

  .createPost-main-container {
    padding: 20px;

    // .postInfo-container {
    //   position: relative;
    //   @include clearfix;
    //   margin-bottom: 10px;

    //   .postInfo-container-item {
    //     float: left;
    //   }
    // }
  }
}
</style>
