<template>
  <div class="event-analysis">
    <el-form-item
      v-for="(event, index) in analysisParams.eventList"
      :key="index"
      :label="index === 0 ? '事件指标' : '事件指标' + (index + 1)"
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
        <el-col style="text-align: center" :span="1">的</el-col>
        <el-col :span="8">
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
        <el-col :span="3" class="delete-position">
          <el-button
            title="添加事件指标"
            icon="el-icon-plus"
            circle
            class="pan-btn light-blue-btn"
            @click="addEventList"
          />
          <el-button
            v-if="analysisParams.eventList.length > 1"
            title="删除该事件指标"
            icon="el-icon-delete"
            circle
            class="pan-btn yellow-btn"
            @click="deleteEvent(event)"
          />
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="3">
          <el-button
            icon="el-icon-plus"
            class="pan-btn light-blue-btn"
            round
            @click="addCondition(event)"
          >指标过滤条件</el-button>
        </el-col>
        <el-col :span="21">
          <ConditionForm :condition="event.conditionList" :data="event" />
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item label="事件条件">
      <el-row>
        <el-col :span="2">
          <el-button
            icon="el-icon-plus"
            class="pan-btn light-blue-btn"
            round
            @click="addEventCondition"
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
    <el-form-item label="按维度查看">
      <el-select
        v-model="analysisParams.dimensionList"
        style="width: 50%"
        multiple
        clearable
        filterable
        placeholder="请选择事件指标（可多选）"
      >
        <el-option label="Zone one" value="shanghai" />
        <el-option label="Zone two" value="beijing" />
      </el-select>
    </el-form-item>
  </div>
</template>

<script>
import ConditionForm from './Form/ConditonFrom'

export default {
  name: 'EventAnalysis',
  components: {
    ConditionForm
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
    // 新增事件指标条件
    addCondition(event) {
      if (event.conditionList.length > 9) {
        this.$message.error('最多添加十个条件')
      }
      event.conditionList.push({
        propertyId: [],
        operator: [],
        tagValue: []
      })
    },
    // 新增事件条件
    addEventCondition() {
      if (this.analysisParams.conditionList.length > 4) {
        this.$message.error('最多添加五个事件条件')
        return
      }
      this.analysisParams.conditionList.push({
        propertyId: [],
        operator: [],
        tagValue: []
      })
    },
    // 新增事件指标
    addEventList() {
      if (this.analysisParams.eventList.length > 4) {
        this.$message.error('最多添加五个事件指标')
        return
      }
      this.analysisParams.eventList.push({
        conditionList: [],
        eventIds: [],
        indicatorValue: [],
        key: Date.now()
      })
    },
    // 删除事件指标
    deleteEvent(event) {
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
<style lang="scss">
.event-analysis .el-form-item .el-form-item {
  margin-bottom: 22px;
}
</style>
