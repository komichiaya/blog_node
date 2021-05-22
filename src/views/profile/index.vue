<template>
  <div class="app-container">
    <div v-if="user">
      <el-row :gutter="20" style="margin: 10px">
        <el-col :span="6" :xs="24">
          <user-card :user="user" :obj="obj" />
        </el-col>

        <el-col :span="18" :xs="24">
          <el-card>
            <el-tabs v-model="activeTab" v-if="!$route.params.id">
              <el-tab-pane label="文章" name="blog">
                <BlogIndex @getInfo="getInfo" />
              </el-tab-pane>
              <el-tab-pane label="发表" name="Edit">
                <!-- <timeline /> -->
                <Edit />
              </el-tab-pane>
              <el-tab-pane label="修改信息" name="changeInfoMation">
                <ChangeInfoMation :user="user" />
              </el-tab-pane>
            </el-tabs>
            <el-page-header @back="$router.back()" content="详情页面" v-else>
            </el-page-header>
            <router-view></router-view>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import UserCard from "@/components/UserCard/userCard";
// import Blog from "./components/blog";
import BlogIndex from "@/components/HomeIndex/homeindex";
import ChangeInfoMation from "@/components/ChangeInfoMation/changeInfoMation";
import Edit from "../Edit";
import { onMounted, reactive, ref, computed, watch } from "vue";
export default {
  name: "Profile",
  components: { UserCard, BlogIndex, ChangeInfoMation, Edit },
  setup(props) {
    const store = useStore();
    const activeTab = ref("blog");
    const obj = reactive({});
    const user = computed(() => store.state.user.userInfo);
    onMounted(() => {
      store.dispatch("getUserInfo", "609e21a68654ed31689fc73d");
    });
    const data = ref("");
    const getNewInfo = () => {
      store.dispatch("getUserInfo", "609e21a68654ed31689fc73d");
    };
    const getInfo = (data) => {
      obj.value = data;
    };
    watch(
      () => obj.value,
      (newValue) => {
        obj.value = newValue;
      }
    );
    return {
      user,
      activeTab,
      getNewInfo,
      data,
      getInfo,
      obj,
    };
  },
};
</script>
<style >
.app-container {
  user-select: none;
}
</style>
