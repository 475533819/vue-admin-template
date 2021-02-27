<template>
  <div class="createPost-container">
    <el-form ref="analysisForm" :model="analysisForm" :rules="rules" class="form-container" label-width="auto" label-suffix="：">
      <sticky :z-index="10" :class-name="'sub-navbar '+analysisForm.status">
        <el-row :gutter="20" class="top-form">
          <el-col :span="10">
            <el-form-item label="分析名称" style="margin-bottom: 0;">
              <el-input v-model="analysisForm.name" placeholder="分析名称" />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="可见范围" style="margin-bottom: 0;">
              <el-select v-model="analysisForm.region" style="width:100%" placeholder="please select your zone">
                <el-option label="Zone one" value="shanghai" />
                <el-option label="Zone two" value="beijing" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-button class="pan-btn blue-btn">
              查询
            </el-button>
            <el-button class="pan-btn green-btn">
              保存
            </el-button>
          </el-col>
        </el-row>
      </sticky>
      <div class="createPost-main-container">
        <el-form-item label="选择应用">
          <el-select
            v-model="analysisForm.appList"
            style="width: 50%"
            multiple
            clearable
            filterable
            placeholder="请选择应用（可多选）"
          >
            <el-option label="Zone one" value="shanghai" />
            <el-option label="Zone two" value="beijing" />
          </el-select>
        </el-form-item>
        <!-- 事件分析 -->
        <EventAnalysis v-if="analysisType === '事件'" :analysis-params="analysisForm" />
        <!-- 漏斗分析 -->
        <FunnelAnalysis v-if="analysisType === '漏斗'" :analysis-params="analysisForm" />
        <!-- 留存分析 -->
        <RetentionAnalysis v-if="analysisType === '留存'" :analysis-params="analysisForm" />
        <!-- 分布分析 -->
        <DistributionAnalysis v-if="analysisType === '分布'" :analysis-params="analysisForm" />
        <!-- 分析结果 -->
        <el-card shadow="hover">
          <div slot="header" class="clearfix">
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
            <el-radio-group v-model="analysisForm.viewType" style="float: right; padding: 3px 0;font-size: 20px">
              <el-radio-button title="表格" label="0"><svg-icon icon-class="table" /></el-radio-button>
              <el-radio-button title="折线图" label="1"><svg-icon icon-class="broken-line" /></el-radio-button>
              <el-radio-button title="柱状图" label="2"><svg-icon icon-class="chart" /></el-radio-button>
              <el-radio-button title="面饼图" label="3"><svg-icon icon-class="pie" /></el-radio-button>
              <el-radio-button title="面积图" label="4"><svg-icon icon-class="area" /></el-radio-button>
              <el-radio-button title="漏斗图" label="5"><svg-icon icon-class="fun" /></el-radio-button>
            </el-radio-group>
          </div>
          <Table v-if="analysisForm.viewType === '0'" />
          <LineChart v-if="analysisForm.viewType === '1'" :chart-data="lineChartData" />
          <BarChart v-if="analysisForm.viewType === '2'" />
          <PieChart v-if="analysisForm.viewType === '3'" />
          <AreaChart v-if="analysisForm.viewType === '4'" />
          <FunnelChart v-if="analysisForm.viewType === '5'" />
        </el-card>
      </div>
    </el-form>
  </div>
</template>

<script>
import Sticky from '@/components/Sticky' // 粘性header组件
import Table from '@/components/Table' // 表格
import LineChart from '@/components/Charts/LineChart' // 折线图
import BarChart from '@/components/Charts/BarChart' // 柱状图
import PieChart from '@/components/Charts/PieChart' // 面饼图
import AreaChart from '@/components/Charts/AreaChart' // 面积图
import FunnelChart from '@/components/Charts/FunnelChart' // 漏斗图
import EventAnalysis from './EventAnalysis' // 事件分析
import FunnelAnalysis from './FunnelAnalysis' // 漏斗分析
import RetentionAnalysis from './RetentionAnalysis' // 留存分析
import DistributionAnalysis from './DistributionAnalysis' // 分布分析
import { eventForm, funelForm, retentionForm, DistriForm } from '../utils/setting'

export default {
  name: 'AnalysisDetail',
  components: { Sticky, EventAnalysis, FunnelAnalysis, RetentionAnalysis, DistributionAnalysis, LineChart, BarChart, PieChart, AreaChart, FunnelChart, Table },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      analysisForm: {},
      rules: {},
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
      value2: '',
      lineChartData: {
        expectedData: [100, 120, 161, 134, 105, 160, 165],
        actualData: [120, 82, 91, 154, 162, 140, 145]
      }
    }
  },
  computed: {
    analysisType() {
      const { title } = this.$route.meta
      let type
      if (title.indexOf('事件') > -1) {
        this.$set(this, 'analysisForm', Object.assign({}, eventForm))
        type = '事件'
      }
      if (title.indexOf('漏斗') > -1) {
        this.$set(this, 'analysisForm', Object.assign({}, funelForm))
        type = '漏斗'
      }
      if (title.indexOf('留存') > -1) {
        this.$set(this, 'analysisForm', Object.assign({}, retentionForm))
        type = '留存'
      }
      if (title.indexOf('分布') > -1) {
        this.$set(this, 'analysisForm', Object.assign({}, DistriForm))
        type = '分布'
      }
      return type
    }
  },
  created() {
    if (this.isEdit) {
      // set tagsview title
      this.setTagsViewTitle()
      // set page title
      this.setPageTitle()
    }
  },
  methods: {
    setTagsViewTitle() {
      const title = this.$route.meta.title
      const route = Object.assign({}, this.$route, { title: `${title}-${this.$route.params.id}` })
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    setPageTitle() {
      const title = this.$route.meta.title
      document.title = `${title} - ${this.$route.params.id}`
    }
  }
}
</script>

<style lang="scss" scoped>
.createPost-container {
  position: relative;

  .createPost-main-container {
    padding: 15px;

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
// .el-form-item--small .el-form-item__content, .el-form-item--small .el-form-item__label {
//   line-height: 50px;
// }
</style>
<style lang="scss">
.top-form .el-form-item__content {
  line-height: 50px;
}
</style>
