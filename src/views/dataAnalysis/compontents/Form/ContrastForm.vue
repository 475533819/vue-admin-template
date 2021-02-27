<template>
  <el-row>
    <el-col :span="8">
      <el-form-item label="对比">
        <el-select
          v-model="data.contrastType"
          style="width: 100%"
          clearable
          filterable
          placeholder="请选择事件指标（可多选）"
        >
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
    </el-col>
    <el-col v-if="data.contrastType" :span="12">
      <el-form-item label="维度">
        <el-select
          v-model="data.dimension"
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
</template>

<script>
export default {
  name: 'ContrastForm',
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style>

</style>
