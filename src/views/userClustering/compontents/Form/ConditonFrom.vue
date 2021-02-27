<template>
  <div>
    <el-row v-for="(item,index) in condition" :key="index">
      <el-col :span="8">
        <el-form-item>
          <el-select
            v-model="item.propertyId"
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
      <el-col class="line" :span="1">-</el-col>
      <el-col :span="3">
        <el-form-item>
          <el-select
            v-model="item.operator"
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
      <el-col class="line" :span="1">-</el-col>
      <el-col :span="9">
        <el-form-item>
          <el-select
            v-model="item.tagValue"
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
      <el-col :span="2" class="delete-position">
        <el-button title="删除该条件" icon="el-icon-delete" circle class="pan-btn red-btn" @click="deleteCondition(data,item)" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'ConditionForm',
  props: {
    condition: {
      type: Array,
      default() {
        return []
      }
    },
    data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    deleteCondition(data, item) {
      const index = data.conditionList.indexOf(item)
      if (index !== -1) {
        data.conditionList.splice(index, 1)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.line {
  text-align: center;
}
.delete-position {
    text-align: right;
  }
</style>
