<template>
  <el-form>
    <el-form-item>
      <div>
        <el-button size="small" type="primary" @click="toggleShow"
          >设置头像</el-button
        >
      </div>
      <my-upload
        @crop-success="cropSuccess"
        @crop-upload-success="cropUploadSuccess"
        @crop-upload-fail="cropUploadFail"
        field="file"
        :width="300"
        :height="300"
        url="/admin/api/upload"
        :params="params"
        :headers="headers"
        v-model="show"
        img-format="png"
      ></my-upload>
      <div v-if="imgDataUrl">
        <p>头像预览:</p>
        <img :src="imgDataUrl" class="showImg" />
      </div>
    </el-form-item>
    <el-form-item label="Name">
      <el-input v-model="user.nickName" />
    </el-form-item>
    <el-form-item label="Email">
      <el-input v-model="user.email" />
    </el-form-item>
    <el-form-item label="About">
      <el-input v-model="user.aboutMe" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">Update</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { toRefs, getCurrentInstance, ref, reactive, watch } from "vue";
import { useStore } from "vuex";
import myUpload from "vue-image-crop-upload";

export default {
  components: {
    myUpload,
  },
  emits: ["getNewInfo"],
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          nickName: "",
          email: "",
          avatarImg: "",
        };
      },
    },
  },
  setup(props, { emit }) {
    const { user } = toRefs(props);
    const { proxy } = getCurrentInstance();
    const { $message } = proxy;
    const store = useStore();

    const show = ref(false);
    const params = reactive({
      name: "avatar",
    });
    const headers = reactive({
      authorization:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOTZiODY5MTAwOGJmOTg3MDdjNDUzMyIsImlhdCI6MTYyMDgwNDczMH0.VWP8LdieTndr32upde5rnVBR9BSlYXbyvs0J7yWdzmM",
    });
    const imgDataUrl = ref("");
    const toggleShow = () => {
      show.value = !show.value;
    };
    const cropSuccess = (imgUrl, field) => {
      imgDataUrl.value = imgUrl;
    };
    watch(
      () => user.value.avatarImg,
      (a) => {
        console.log(a);
      }
    );
    /**
     * upload success
     *
     * [param] jsonData   服务器返回数据，已进行json转码
     * [param] field
     */
    const cropUploadSuccess = async (jsonData, field) => {
      await store.dispatch("updateUserInfo", {
        id: "609e21a68654ed31689fc73d",
        data: { avatarImg: jsonData.url },
      });
      user.value.avatarImg = jsonData.url;

      console.log("field: " + field);
    };
    /**
     * upload fail
     *
     * [param] status    server api return error status, like 500
     * [param] field
     */
    const cropUploadFail = (status, field) => {
      console.log(status);
      console.log("field: " + field);
    };

    const submit = () => {
      store.dispatch("updateUserInfo", {
        id: "609e21a68654ed31689fc73d",
        data: {
          nickName: user.value.nickName,
          email: user.value.email,
          aboutMe: user.value.aboutMe,
        },
      });

      $message({
        message: "更新成功",
        type: "success",
      });
    };
    return {
      user,
      submit,
      show,
      params,
      headers,
      imgDataUrl,
      cropUploadFail,
      cropUploadSuccess,
      cropSuccess,
      toggleShow,
    };
  },
  // methods: {
  //   submit() {
  //     this.$message({
  //       message: "User information has been updated successfully",
  //       type: "success",
  //       duration: 5 * 1000,
  //     });
  //   },
  // },
};
</script>
<style>
.showImg {
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 200px;
  height: 200px;
}
</style>