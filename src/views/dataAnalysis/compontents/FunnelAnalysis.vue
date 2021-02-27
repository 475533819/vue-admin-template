<template>
  <div>
    <el-form-item label="指标">
      <el-select
        v-model="analysisParams.distinctValue"
        style="width: 50%"
        clearable
        filterable
        placeholder="请选择应用（可多选）"
      >
        <el-option label="Zone one" value="shanghai" />
        <el-option label="Zone two" value="beijing" />
      </el-select>
    </el-form-item>
    <el-form-item
      v-for="(event, index) in analysisParams.eventList"
      :key="index"
      :label="index === 0 ? '漏斗步骤' : '漏斗步骤' + (index + 1)"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item style="margin-bottom: 0">
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
        <el-col :span="3" class="delete-position">
          <el-button
            title="添加事件指标"
            icon="el-icon-plus"
            circle
            class="pan-btn light-blue-btn"
            @click="addFunList"
          />
          <el-button
            v-if="analysisParams.eventList.length > 1"
            title="删除该事件指标"
            icon="el-icon-delete"
            circle
            class="pan-btn yellow-btn"
            @click="deleteFun(event)"
          />
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item label="漏斗条件">
      <el-row>
        <el-col :span="2">
          <el-button
            icon="el-icon-plus"
            class="pan-btn light-blue-btn"
            round
            @click="addFunCondition"
          />
        </el-col>
        <el-col :span="22">
          <ConditionForm
            :condition="analysisParams.conditionList"
            :data="analysisParams"
          />
        </el-col>
      </el-row>
    </el-form-item>
    <ContrastForm :data="analysisParams" />
  </div>
</template>

<script>
import ConditionForm from './Form/ConditonFrom'
import ContrastForm from './Form/ContrastForm'

export default {
  name: 'FunnelAnalysis',
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
    // 新增漏斗条件
    addFunCondition() {
      if (this.analysisParams.conditionList.length > 4) {
        this.$message.error('最多添加五个漏斗条件')
        return
      }
      this.analysisParams.conditionList.push({
        propertyId: [],
        operator: [],
        tagValue: []
      })
    },
    // 新增漏斗步骤
    addFunList() {
      if (this.analysisParams.eventList.length > 4) {
        this.$message.error('最多添加五个漏斗步骤')
        return
      }
      this.analysisParams.eventList.push({
        eventIds: [],
        key: Date.now()
      })
    },
    // 删除漏斗步骤
    deleteFun(event) {
      const index = this.analysisParams.eventList.indexOf(event)
      if (index !== -1) {
        this.analysisParams.eventList.splice(index, 1)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.delete-position {
  text-align: right;
}
</style>
