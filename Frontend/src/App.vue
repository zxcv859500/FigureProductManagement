<template>
  <div id="app">
    <el-header>
      <navigation></navigation>
    </el-header>
    <el-main class="barcode-form">
      <router-view></router-view>
    </el-main>
  </div>
</template>

<script>
import BarcodeForm from './components/BarcodeForm.vue'
import navigation from './components/Nav.vue'

export default {
  name: 'app',
  components: {
    BarcodeForm,
    navigation
  }
}
</script>

<style>
  .el-main {
    margin-right: 200px;
    margin-left: 200px;
    margin-top: 30px;
    border: solid 1px #ebeef5;
    border-radius: 5px;
  }
</style>
