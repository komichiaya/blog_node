<!--  -->
<template>
  <div class="body">
    <el-form :rules="rules" ref="ruleForm" :model="ruleForm1">
      <el-card class="box-card">
        <el-input
          type="text"
          placeholder="请输入标题"
          v-model="title"
          maxlength="30"
          show-word-limit
          style="
            font-size: 28px;
            padding: 12px 50px 12px 0;
            font-weight: 700;
            line-height: 40px;
          "
        >
        </el-input>
        <TinymceEditor ref="editor" v-model="msg" :value="value">
        </TinymceEditor>
        <div class="tag">
          <el-form-item label="请选择文章类型" prop="resource">
            <el-radio-group v-model="ruleForm1.resource" size="small">
              <el-radio-button label="文章"></el-radio-button>
              <el-radio-button label="碎碎念"></el-radio-button>
              <el-radio-button label="写作"></el-radio-button>
            </el-radio-group>
          </el-form-item>
        </div>
        <div class="isTop">
          <el-switch v-model="isTop" active-text="置顶" inactive-text="不置顶">
          </el-switch>
        </div>
        <div style="width: 200px; margin: 8px auto">
          <el-button type="primary" :disabled="disabled" @click="submitForm()"
            >提交</el-button
          >
          <el-button type="danger" :disabled="disabled" @click="clear"
            >清除内容</el-button
          >
        </div>
      </el-card>
    </el-form>
  </div>
</template>

<script>
import {
  computed,
  defineComponent,
  reactive,
  ref,
  watch,
  toRefs,
  onMounted,
  getCurrentInstance,
} from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import TinymceEditor from "../components/TinymceEditor/tinymceEditor";
export default defineComponent({
  components: { TinymceEditor },
  props: {
    id: {
      type: String,
    },
  },
  setup(props) {
    const { proxy } = getCurrentInstance();
    const { id } = toRefs(props);
    const store = useStore();
    const router = useRouter();
    const txt_id = computed(() => store.state.txt.data._id);
    const title = ref("");
    const msg = ref(null);
    const disabled = ref(true);
    const editor = ref({});
    const value = ref("");
    const radio1 = ref("");
    const ruleForm = ref();
    const isTop = ref(false);
    const ruleForm1 = reactive({
      resource: "",
    });
    const rules = ref({
      resource: [
        { required: true, message: "请选择文章类型", trigger: "change" },
      ],
    });
    onMounted(async () => {
      if (id) {
        await store.dispatch("txtInfo", id.value).then(() => {
          const txt_info = computed(() => store.state.txt.txtInfo);
          title.value = txt_info.value.title;
          value.value = txt_info.value.body;
          ruleForm1.resource = txt_info.value.categories[0];
          isTop.value = txt_info.value.top;
        });
      }
    });
    const submit = async () => {
      if (!id) {
        await store.dispatch("Edit", {
          title: title.value,
          body: msg.value,
          categories: [ruleForm1.resource],
          top: isTop.value,
        });
        router.push(`/blog/${txt_id.value}`);
      } else {
        await store.dispatch("updateTxt", {
          id: id.value,
          data: {
            title: title.value,
            body: msg.value,
            categories: [ruleForm1.resource],
            // 获取是否置顶
            top: isTop.value,
          },
        });
        router.replace(`/blog/${id.value}`);
      }

      proxy.$message({
        type: "success",
        message: "保存成功",
      });
    };
    const clear = () => {
      editor.value.clear();
      title.value = "";
    };
    const submitForm = () => {
      ruleForm.value.validate((valid) => {
        if (valid) {
          submit();
        } else {
          proxy.$message({
            type: "error",
            message: "错误",
          });
          return false;
        }
      });
    };
    watch(
      () => editor.value.myValue,
      (newValue) => {
        //通过一个函数返回要监听的属性
        msg.value = newValue;
        if (msg.value.length > 0) {
          disabled.value = false;
        } else {
          disabled.value = true;
        }
      }
    );
    return reactive({
      title,
      msg,
      editor,
      disabled,
      disabled,
      submit,
      clear,
      value,
      radio1,
      rules,
      ruleForm,
      submitForm,
      ruleForm1,
      isTop,
    });
  },
});
</script>
<style lang="less">
/* @import url(); 引入css类 */
.body {
  max-width: 960px;
  margin: 18px auto;
}
.el-input__inner {
  border: none;
}
.tag {
  margin-top: 8px;
  p {
    margin: 16px 0;
  }
}
</style>
