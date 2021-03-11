<template>
  <div v-loading="listLoading" class="app-container" element-loading-text="Loading">
    <el-form ref="boardForm" :model="boardForm" label-width="100px">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="创建类型">
            <el-select v-model="boardForm.createType" style="width: 100%" placeholder="请选择创建类型">
              <el-option label="所有分析" value />
              <el-option label="他人授权的" value="0" />
              <el-option label="我创建的" value="1" />
              <el-option label="他人创建的" value="2" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="看板名称">
            <el-input v-model="boardForm.boardName" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="创建人">
            <el-input v-model="boardForm.createName" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="数据状态">
            <el-select v-model="boardForm.status" style="width: 100%" placeholder="请选择活动区域">
              <el-option label="已隐藏" value="1" />
              <el-option label="已显示" value />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item>
            <el-button class="pan-btn light-blue-btn">搜索</el-button>
            <el-button class="pan-btn tiffany-btn">重置</el-button>
            <el-button class="pan-btn green-btn" @click.prevent="newCreate">新建</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table
      :data="boardList"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">{{ scope.$index }}</template>
      </el-table-column>
      <el-table-column label="看板名称">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column label="摆列" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.queuePlace }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建人" width="110" align="center">
        <template slot-scope="scope">{{ scope.row.createName }}</template>
      </el-table-column>
      <el-table-column label="浏览次数" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.views }}
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
          <router-link :to="'/dashboard/editor/'+scope.row.id">
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
      <pagination :total="total" :page.sync="boardForm.pageNum" :limit.sync="boardForm.pageSize" @pagination="fetchData" />
    </div>
  </div>
</template>

<script>
import { getBoardList } from '@/api/dashboard'
import { mapGetters } from 'vuex'
import Pagination from '@/components/Pagination'

export default {
  name: 'KanbanList',
  components: { Pagination },
  data() {
    return {
      boardForm: {
        boardName: '',
        createName: '',
        createType: '',
        status: '',
        pageSize: 10,
        pageNum: 1
      },
      listLoading: false,
      boardList: null,
      total: 0
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getBoardList(this.boardForm).then((response) => {
        this.boardList = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    },
    newCreate() {
      this.$router.push('/dashboard/create')
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
