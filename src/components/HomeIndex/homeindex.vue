<template>
  <div v-if="!$route.params.id">
    <div class="user-activity" v-for="item in AllTxt" :key="item._id">
      <div class="post">
        <div class="user-block">
          <span class="username text-muted">
            <router-link
              class="blog_title"
              :to="{ name: 'Blog', params: { id: item._id } }"
              >{{ item.title }}</router-link
            ></span
          >
          <div class="more">
            <el-dropdown trigger="click">
              <span class="el-dropdown-link" style="cursor: pointer">
                更多<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item
                    @click="
                      $router.push({ name: 'Edit', params: { id: item._id } })
                    "
                    >编辑</el-dropdown-item
                  >
                  <el-dropdown-item @click="remove(item._id)"
                    >删除</el-dropdown-item
                  >
                  <el-dropdown-item @click="setTop(item._id)"
                    >置顶</el-dropdown-item
                  >
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
          <span class="description"> {{ time(item.createdAt) }}</span>
        </div>
        <div class="txt_info">
          <div>
            <p v-html="clearImg(item.body)"></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import {
  getCurrentInstance,
  onMounted,
  reactive,
  ref,
  computed,
  toRefs,
  watch,
} from "vue";
import { useStore } from "vuex";
export default {
  name: "Home",
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();
    const isTop = ref(false);
    const time = proxy.$time;
    const API = proxy.$API;
    const $confirm = proxy.$confirm;
    const $message = proxy.$message;
    const store = useStore();
    const txtInfo = computed(() => store.state.txt.txtInfo);
    const AllTxt = computed(() => store.state.txt.AllTxt);
    const Count = computed(() => {
      let obj = {};
      for (let item of AllTxt.value) {
        let key = item.categories[0];
        if (obj[key]) {
          obj[key]++;
        } else {
          obj[key] = 1;
        }
      }
      return {
        listCount: obj,
        AllCount: AllTxt.value.length,
      };
    });
    const listCount = reactive({
      allCount: AllTxt.value.length,
    });
    const clearImg = (someElement) => {
      // const imgReg = /<p\b[^<>]*><img\b[^<>]*\/>*<\/p>/g;
      const strReg = /<p>(.*?)<\/p>/g;
      const imgReg = /<img [^>]*src=['"]([^'"]+)[^>]*>/g;
      let imgMatchContentArray = someElement.match(imgReg);
      let imgArr = someElement.match(strReg);

      if (imgReg.test(someElement)) {
        someElement = someElement.replace(imgReg, "");
      } else {
        // console.log(someElement.match(strReg));
      }
      someElement = someElement.replace(/&nbsp;/gi, " ");
      return someElement;
    };
    const remove = (id) => {
      if (id) {
        $confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(async () => {
            await API.delTxt(id);
            await store.dispatch("getAllTxt");
          })
          .catch(() => {
            $message({
              type: "info",
              message: "已取消删除",
            });
          });
      }
    };
    const setTop = async (id) => {
      isTop.value = true;
      await store.dispatch("updateTxt", {
        id: id,
        data: {
          // 获取是否置顶
          top: isTop.value,
        },
      });
    };
    watch(
      () => Count.value,
      (newValue) => {
        emit("getInfo", newValue);
      }
    );
    onMounted(() => {
      store.dispatch("getAllTxt");
    });
    return reactive({
      AllTxt,
      time,
      remove,
      clearImg,
      Count,
      setTop,
    });
  },
};
</script>


<style lang="scss" scoped>
a {
  text-decoration: none;
  color: #303133;
}
.more {
  float: right;
}
.txt_info {
  line-height: 1.8;
  text-align: left;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;

  img {
    border-radius: 8px;
    margin: 8px;
    width: 400px;
  }
}
.user-activity {
  .user-block {
    .username,
    .description {
      display: block;
      padding: 2px 0;
    }

    .username {
      font-size: 16px;
      color: #000;
      display: inline-block;
    }

    :after {
      clear: both;
    }

    .img-circle {
      border-radius: 50%;
      width: 40px;
      height: 40px;
      float: left;
    }

    span {
      font-weight: 500;
      font-size: 12px;
    }
  }

  .post {
    font-size: 14px;
    border-bottom: 1px solid #d2d6de;
    margin-bottom: 15px;
    padding-bottom: 15px;
    color: #666;

    .image {
      width: 100%;
      height: 100%;
    }

    .user-images {
      padding-top: 20px;
    }
  }

  .list-inline {
    padding-left: 0;
    margin-left: -5px;
    list-style: none;

    li {
      display: inline-block;
      padding-right: 5px;
      padding-left: 5px;
      font-size: 13px;
    }

    .link-black {
      &:hover,
      &:focus {
        color: #999;
      }
    }
  }
}

.box-center {
  margin: 0 auto;
  display: table;
}

.text-muted {
  color: #777;
}
</style>
