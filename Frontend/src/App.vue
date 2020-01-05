<template>
  <div id="app">
    <el-header>
      <navigation></navigation>
    </el-header>
    <el-main class="Login">
      <router-view></router-view>
    </el-main>
  </div>
</template>

<script>
import login from './components/login.vue'
import navigation from './components/Nav.vue'

export default {
  name: 'app',
  components: {
    login,
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
