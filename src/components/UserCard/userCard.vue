<template>
  <el-card style="margin-bottom: 20px">
    <div slot="header" class="clearfix">
      <span>About me</span>
    </div>

    <div class="user-profile">
      <div class="box-center">
        <div class="img">
          <img :src="user.avatarImg" alt="" />
        </div>
        <!-- {{ user.url }} -->
      </div>
      <div class="box-center">
        <div class="user-name text-center">{{ user.nickName }}</div>
        <!-- <div class="user-role text-center text-muted">
          {{ user.url | uppercaseFirst }}
        </div> -->
      </div>
    </div>

    <div class="user-bio">
      <div class="user-education user-bio-section">
        <div class="user-bio-section-header">
          <!-- <svg-icon icon-class="education" /><span>Education</span> -->
        </div>
        <div class="user-bio-section-body">
          <div class="text-muted">blog后台操作系统</div>
        </div>
      </div>

      <div class="user-skills user-bio-section">
        <div class="user-bio-section-header">
          <!-- <svg-icon icon-class="skill" /><span>Skills</span> -->
        </div>
        <div class="user-bio-section-body" v-if="obj.value">
          <div class="progress-item">
            <span>文章</span>
            <el-progress
              :percentage="
                Math.floor(obj.value.listCount.文章 / obj.value.AllCount / 0.01)
              "
            />
          </div>
          <div class="progress-item">
            <span>碎碎念</span>
            <el-progress
              :percentage="
                Math.floor(
                  obj.value.listCount.碎碎念 / obj.value.AllCount / 0.01
                )
              "
            />
          </div>
          <div class="progress-item">
            <span>写作</span>
            <el-progress
              :percentage="
                Math.floor(obj.value.listCount.写作 / obj.value.AllCount / 0.01)
              "
            />
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import { toRefs, watch } from "vue";
// import PanThumb from '@/components/PanThumb'

export default {
  // components: { PanThumb },
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          nickName: "",
          email: "",
          avatarImg: "",
          url: "",
        };
      },
    },
    obj: {
      type: Object,
      default: () => {
        return {
          value: {},
        };
      },
    },
  },
  setup(props) {
    const { obj } = toRefs(props);
    return {
      obj,
      // allCount: obj.value.value.AllCount || 1,
      // listCount: obj.value.value.listCount || {},
    };
  },
};
</script>

<style lang="scss" scoped>
.box-center {
  margin: 0 auto;
  display: table;
  .img {
    cursor: pointer;
    width: 100px;
    height: 100px;
    img {
      border-radius: 50%;
      width: 100%;
      height: 100%;
    }
  }
}

.text-muted {
  color: #777;
}

.user-profile {
  .user-name {
    font-weight: bold;
  }

  .box-center {
    padding-top: 10px;
  }

  .user-role {
    padding-top: 10px;
    font-weight: 400;
    font-size: 14px;
  }

  .box-social {
    padding-top: 30px;

    .el-table {
      border-top: 1px solid #dfe6ec;
    }
  }

  .user-follow {
    padding-top: 20px;
  }
}

.user-bio {
  margin-top: 20px;
  color: #606266;

  span {
    padding-left: 4px;
  }

  .user-bio-section {
    font-size: 14px;
    padding: 15px 0;

    .user-bio-section-header {
      border-bottom: 1px solid #dfe6ec;
      padding-bottom: 10px;
      margin-bottom: 10px;
      font-weight: bold;
    }
  }
}
</style>
