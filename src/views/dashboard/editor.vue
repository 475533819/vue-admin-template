<template>
  <BoardDetail :is-edit="true" />
</template>

<script>
import BoardDetail from './compontents/BoardDetail'
export default {
  name: 'EditorBoard',
  components: { BoardDetail }
}
</script>

<style>

</style>
