<template>
  <div>
    <el-form-item v-for="(event,index) in data" :key="index">
      <el-row>
        <el-col :span="7">
          <el-form-item label="时间">
            <el-radio-group v-model="event.radioIndex">
              <el-radio label="1">日期区间</el-radio>
              <el-radio label="2">前几天</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col v-if="event.radioIndex === '1'" :span="10">
          <el-form-item>
            <el-date-picker
              v-model="event.eventTime"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
            />
          </el-form-item>
        </el-col>
        <el-col v-if="event.radioIndex === '2'" :span="10">
          <el-form-item>
            <el-input-number v-model="event.dayNum" :min="0" :precision="0" />
          </el-form-item>
        </el-col>
        <el-col :span="7" class="delete-position">
          <el-button title="新增事件" icon="el-icon-plus" circle class="pan-btn light-blue-btn" @click="addEvent" />
          <el-button v-if="data.length > 1" title="删除该事件" icon="el-icon-delete" circle class="pan-btn red-btn" @click="deleteEvent(index)" />
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item :label="'A'+(index+1)">
            <el-select
              v-model="event.eventId"
              style="width: 100%"
              clearable
              filterable
              placeholder="请选择事件"
            >
              <el-option label="Zone one" value="shanghai" />
              <el-option label="Zone two" value="beijing" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="1">的</el-col>
        <el-col :span="6">
          <el-form-item>
            <el-cascader
              v-model="event.indicatorValue"
              :options="options"
              style="width: 100%"
              filterable
              placeholder="请选择指标"
              @change="cascaderChange"
            />
          </el-form-item>
        </el-col>
        <el-col class="line" :span="1">-</el-col>
        <el-col :span="3">
          <el-form-item>
            <el-select
              v-model="event.operator"
              style="width: 100%"
              clearable
              filterable
              placeholder="请选择应用（可多选）"
            >
              <el-option label="Zone one" value="shanghai" />
              <el-option label="Zone two" value="beijing" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="1">-</el-col>
        <el-col :span="6">
          <el-form-item>
            <el-input-number v-model="event.tagValue" :min="0" :precision="0" />
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
          >事件过滤条件</el-button>
        </el-col>
        <el-col :span="21">
          <ConditionForm :condition="event.conditionList" :data="event" />
        </el-col>
      </el-row>
    </el-form-item>
  </div>
</template>

<script>
import ConditionForm from './ConditonFrom'

export default {
  name: 'UserDone',
  components: { ConditionForm },
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
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
      options: []
    }
  },
  methods: {
    cascaderChange(value) {

    },
    // 新增事件过滤条件
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
    // 新增用户做过事件
    addEvent() {
      if (this.data.length > 5) {
        this.$message.error('最多添加六个事件')
      }
      this.data.push({
        radioIndex: '1',
        eventTime: '',
        eventId: '',
        indicatorValue: [],
        operator: '',
        conditionList: []
      })
    },
    deleteEvent(index) {
      this.data.splice(index, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.line {
  text-align: center;
}
</style>
