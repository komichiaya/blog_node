<template>
  <div class="login-container">
    <el-form
      ref="form"
      :model="loginForm"
      label-width="80px"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">Login Form</h3>
      </div>
      <el-form-item label="用户账号" prop="username">
        <el-input
          v-model="loginForm.username"
          ref="username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="loginForm.password"
          :key="passwordType"
          ref="password"
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="login"
        ></el-input>
        <el-button type="primary" @click="ShowPwd"></el-button>
      </el-form-item>
      <div style="width: 100px; margin: 0 auto">
        <el-button type="primary" @click="login">登录</el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
import {
  defineComponent,
  onMounted,
  computed,
  reactive,
  ref,
  nextTick,
} from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { ElMessage } from "element-plus";
export default defineComponent({
  components: {},
  setup() {
    const store = useStore();
    const router = useRouter();
    const userInfo = computed(() => store.state.login.data);
    const token = computed(() => store.state.login.token);
    const password = ref(null);
    const passwordType = ref("password");
    const loginForm = ref({
      username: "asd123",
      password: "asd123",
    });
    const login = () => {
      store
        .dispatch("Login", {
          username: loginForm.value.username,
          password: loginForm.value.password,
        })
        .then(() => {
          console.log(token.value);
          localStorage.setItem("user_token", token.value);
          router.push({ path: "/" });
        });
    };
    const ShowPwd = () => {
      if (passwordType.value === "password") {
        passwordType.value = "";
      } else {
        passwordType.value = "password";
      }
      nextTick(() => {
        password.value.focus();
      });
    };
    return reactive({
      login,
      loginForm,
      ShowPwd,
      passwordType,
      password,
    });
  },
});
</script>
<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
