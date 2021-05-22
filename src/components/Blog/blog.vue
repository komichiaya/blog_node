<!--  -->
<template>
  <div>
    <div class="user-activity">
      <div class="post">
        <div class="user-block">
          <span class="username text-muted">
            <h1>{{ oneTxtInfo.title }}</h1>
          </span>
          <span class="description"> {{ time(oneTxtInfo.createdAt) }}</span>
        </div>
        <div class="txt_info">
          <div>
            <p v-html="oneTxtInfo.body"></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  computed,
  onMounted,
  reactive,
  toRefs,
  getCurrentInstance,
  watch,
  ref,
} from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
export default {
  name: "Blog",
  setup(props) {
    const store = useStore();
    const route = useRoute();
    const id = ref("");
    watch(
      () => route.params.id,
      (newValue) => {
        id.value = newValue;
      }
    );
    const oneTxtInfo = computed(() => store.state.txt.txtInfo);
    const { proxy } = getCurrentInstance();
    const time = proxy.$time;
    onMounted(() => {
      store.dispatch("txtInfo", id.value || route.params.id);
    });
    return reactive({
      oneTxtInfo,
      time,
    });
  },
};
</script>
<style scoped lang='less'>
@import url("../../assets/index.css");

:deep(h1, h2, h3, h4, h5, h6) {
  font-weight: blod;
}
:deep(h1) {
  font-size: 40px;
}
:deep(h2) {
  font-size: 38px;
}
:deep(h3) {
  font-size: 36px;
}
:deep(h4) {
  font-size: 32px;
}
:deep(h5) {
  font-size: 26px;
}
:deep(h6) {
  font-size: 24px;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}
.txt_info {
  line-height: 1.8;
  text-align: left;

  img {
    border-radius: 8px;
    margin: 8px;
    width: 400px;
  }
}
.user-activity {
  margin-top: 15px;
  .user-block {
    .username,
    .description {
      display: block;
      padding: 2px 0;
    }

    .username {
      font-size: 16px;
      color: #000;
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

