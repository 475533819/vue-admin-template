<template>
  <div>
    <el-form-item
      v-for="(event, index) in analysisParams.eventList"
      :key="index"
      label="初始条件"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item>
            <el-select
              v-model="event.eventIds"
              style="width: 100%"
              multiple
              clearable
              filterable
              placeholder="请选择事件指标（可多选）"
            >
              <el-option label="Zone one" value="shanghai" />
              <el-option label="Zone two" value="beijing" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3">
          <el-button
            icon="el-icon-plus"
            class="pan-btn light-blue-btn"
            round
            @click="addCondition(event)"
          >过滤条件</el-button>
        </el-col>
        <el-col :span="21">
          <ConditionForm :condition="event.conditionList" :data="event" />
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item label="留存类型">
      <el-select
        v-model="analysisParams.showType"
        style="width: 50%"
        clearable
        filterable
        placeholder="请选择事件指标（可多选）"
      >
        <el-option label="Zone one" value="shanghai" />
        <el-option label="Zone two" value="beijing" />
      </el-select>
    </el-form-item>
    <ContrastForm :data="analysisParams" />
  </div>
</template>

<script>
import ConditionForm from './Form/ConditonFrom'
import ContrastForm from './Form/ContrastForm'

export default {
  name: 'RetentionAnalysis',
  components: {
    ConditionForm,
    ContrastForm
  },
  props: {
    analysisParams: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    // 新增过滤条件
    addCondition(event) {
      if (event.conditionList.length > 9) {
        this.$message.error('最多添加十个条件')
      }
      event.conditionList.push({
        propertyId: [],
        operator: [],
        tagValue: []
      })
    }
  }
}
</script>

<style>

</style>
