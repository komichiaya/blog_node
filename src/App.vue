<template>
  <Header v-if="$route.path != '/login'" />
  <router-view />
</template>
<script>
import Header from "./components/Header/Header";
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
  components: { Header },
  setup(props) {
    const router = useRouter();
    const store = useStore();
    onMounted(() => {});
  },
};
</script>
<style lang="scss">
html,
body {
  height: 100%;
}
.el-main {
  background-color: #eee !important;
}

#app {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  padding: 0px;
  margin: 0px;
  height: 100%;

}
.main {
  height: 100%;
}
</style>
