<template>
  <div class="createPost-container">
    <el-form ref="boardForm" :model="boardForm" :rules="rules" class="form-container">
      <sticky :z-index="10" :class-name="'sub-navbar '+boardForm.status">
        <el-button class="pan-btn blue-btn">
          添加图表
        </el-button>
        <el-button class="pan-btn green-btn">
          保存
        </el-button>
      </sticky>
      <div class="createPost-main-container">
        <GridLayout />
      </div>
    </el-form>
  </div>
</template>

<script>
// import { getBoardList } from '@/api/dashboard'
import Sticky from '@/components/Sticky' // 粘性header组件
import GridLayout from './GridLayout'
export default {
  name: 'BoardDetail',
  components: { Sticky, GridLayout },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      title: '',
      boardForm: {
        status: 'draft'
      },
      rules: {}
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
    // padding: 20px;

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
