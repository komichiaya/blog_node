<!--  -->
<template>
  <el-header
    :style="{
      position: 'sticky',
      top: '0px',
      'z-index': '99',
      padding: '0px',
    }"
  >
    <el-menu
      :default-active="defaultActive"
      mode="horizontal"
      @select="handleSelect"
      router
    >
      <el-menu-item index="/">首页</el-menu-item>
      <el-submenu index="2" style="float: right">
        <template #title>我的</template>
        <el-menu-item index="">消息</el-menu-item>
        <el-menu-item index="">登出</el-menu-item>
      </el-submenu>
    </el-menu>
  </el-header>
</template>

<script>
import { reactive, ref } from "vue";
export default {
  setup(props) {
    const defaultActive = ref("/");
    const handleSelect = (key, keyPath) => {
      console.log(key, keyPath);
    };
    return reactive({
      defaultActive,
      handleSelect,
    });
  },
};
</script>
<style scoped lang="less">
/* @import url(); 引入css类 */
.el-header {
  color: #333;
  text-align: center;
  line-height: 60px;
}
</style>