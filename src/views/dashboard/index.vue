<template>
  <div class="createPost-container">
    <sticky :z-index="10" :class-name="'sub-navbar draft'">
      <el-row :gutter="20" class="top-form">
        <el-col :span="20" style="text-align: left">
          <el-date-picker
            v-model="value2"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
          />
        </el-col>
        <el-col :span="4" style="text-align: right">
          <el-button class="pan-btn blue-btn">
            新增看板
          </el-button>
          <el-button class="pan-btn green-btn" @click="skip">
            看板库
          </el-button>
        </el-col>
      </el-row>
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
      activeName: 'first',
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      value2: ''
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
