<template>
  <BoardDetail :is-edit="false" />
</template>

<script>
import BoardDetail from './compontents/BoardDetail'
export default {
  name: 'CreateBoard',
  components: { BoardDetail }
}
</script>

<style>

</style>
