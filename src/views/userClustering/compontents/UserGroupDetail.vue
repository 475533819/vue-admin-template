<template>
  <div class="createPost-container">
    <el-form ref="userForm" :model="userForm" :rules="rules" class="form-container" label-width="auto" label-suffix="：">
      <sticky :z-index="10" :class-name="'sub-navbar '+userForm.status">
        <el-row :gutter="20" class="top-form">
          <el-col :span="10">
            <el-form-item label="分析名称" style="margin-bottom: 0;">
              <el-input v-model="userForm.name" placeholder="分析名称" />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="可见范围" style="margin-bottom: 0;">
              <el-select v-model="userForm.region" style="width:100%" placeholder="please select your zone">
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
            v-model="userForm.appList"
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
        <!-- 用户做过 -->
        <el-form-item label="用户做过">
          <UserDone :data="userForm.eventList" />
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="分群条件">
              条件关系（且）
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="更新方式">
              手动
            </el-form-item>
          </el-col>
        </el-row>
        <el-card shadow="hover">
          <div slot="header" class="clearfix">
            <span>查询结果</span>
            <el-button style="float: right;" class="pan-btn yellow-btn">导出</el-button>
          </div>
        </el-card>
      </div>
    </el-form>
  </div>
</template>

<script>
import Sticky from '@/components/Sticky' // 粘性header组件
import UserDone from './Form/UserDone'

const defaultForm = {
  status: 'draft',
  eventList: [
    {
      radioIndex: '1',
      eventTime: '',
      eventId: '',
      indicatorValue: [],
      operator: '',
      conditionList: []
    }
  ]
}

export default {
  name: 'UserGroupDetail',
  components: { Sticky, UserDone },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      userForm: Object.assign({}, defaultForm),
      rules: {}
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
</style>
<style lang="scss">
.top-form .el-form-item__content {
  line-height: 50px;
}
</style>
