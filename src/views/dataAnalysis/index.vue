<template>
  <div v-loading="listLoading" class="app-container" element-loading-text="Loading">
    <el-form ref="analysisForm" :model="analysisForm" label-width="100px">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="创建类型">
            <el-select v-model="analysisForm.createType" style="width: 100%" placeholder="请选择创建类型">
              <el-option label="所有分析" value />
              <el-option label="他人授权的" value="0" />
              <el-option label="我创建的" value="1" />
              <el-option label="他人创建的" value="2" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="分析名称">
            <el-input v-model="analysisForm.chartName" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="创建人">
            <el-input v-model="analysisForm.createName" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="数据状态">
            <el-select v-model="analysisForm.status" style="width: 100%" placeholder="请选择活动区域">
              <el-option label="已隐藏" value="1" />
              <el-option label="已显示" value />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item>
            <el-button class="pan-btn light-blue-btn">搜索</el-button>
            <el-button class="pan-btn tiffany-btn">重置</el-button>
            <el-button class="pan-btn green-btn" @click="newCreate">新建</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table
      :data="list"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="分析名称">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column label="分析类型" width="110" align="center">
        <template slot-scope="scope">{{ scope.row.type | typeFilter }}</template>
      </el-table-column>
      <el-table-column label="创建人" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="浏览次数" width="110" align="center">
        <template slot-scope="scope">{{ scope.row.views }}</template>
      </el-table-column>
      <el-table-column class-name="status-col" label="在板数" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.inBoard }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="上次修改时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.updateTime }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="160" class-name="action">
        <template slot-scope="scope">
          <router-link :to="analysisName+'/editor/'+scope.row.id">
            <i class="el-icon-edit" title="编辑" />
            <!-- <el-button class="pan-btn blue-btn" icon="el-icon-edit">
              编辑
            </el-button> -->
          </router-link>
          <i class="el-icon-video-play" />
          <i class="el-icon-delete-solid" style="color: red" />
          <i class="el-icon-setting" />
          <i class="el-icon-circle-plus" />
          <i class="el-icon-document-copy" />
          <i class="el-icon-user-solid" />
        </template>
      </el-table-column>
    </el-table>
    <div v-show="total>0" class="foot-pagination">
      <pagination :total="total" :page.sync="analysisForm.pageNum" :limit.sync="analysisForm.pageSize" @pagination="fetchData" />
    </div>
  </div>
</template>

<script>
import { getAnalysisList } from '@/api/analysis'
import Pagination from '@/components/Pagination'

export default {
  name: 'Index',
  components: { Pagination },
  filters: {
    typeFilter(status) {
      const statusMap = ['事件分析', '漏斗分析', '留存分析', '分布分析']
      return statusMap[status]
    }
  },
  data() {
    return {
      analysisForm: {
        createType: '',
        chartName: '',
        createName: '',
        status: '',
        pageSize: 10,
        pageNum: 1
      },
      list: null,
      listLoading: true,
      total: 0
    }
  },
  computed: {
    analysisName() {
      return this.$route.name
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getAnalysisList(this.analysisForm).then((response) => {
        this.list = response.data.list
        this.total = response.data.total
        this.listLoading = false
      })
    },
    newCreate() {
      this.$router.push('/dataAnalysis/' + this.analysisName + '/create')
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  .action i{
    margin-right: 5px
  }
}
</style>
