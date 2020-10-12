<template>
  <div>
    <mt-header id="title" title="打卡记录">
      <router-link to="/author" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <p class="aboutUser">{{ username }}的打卡记录</p>
    <div class="card" v-for="(item, index) in detail" v-bind:key="index">
      <mt-cell title="序号"
        ><span>{{ index + 1 }}</span>
      </mt-cell>
      <mt-cell title="星级"
        ><span>{{ item.star }}</span></mt-cell
      >
      <mt-cell title="班次">{{ item.grade }}</mt-cell>
      <mt-cell title="工资">{{ item.money }}</mt-cell>
      <mt-cell title="打卡时间">{{ item.created_at }}</mt-cell>
      <mt-cell title="备注">{{ item.remarks }}</mt-cell>
    </div>
  </div>
</template>
<script>
import { Header, Indicator, Toast, Cell } from "mint-ui";

export default {
  name: "About",
  data() {
    return {
      detail: [],
      username: "",
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    backPage() {
      this.$router.back();
    },
    getData() {
      Indicator.open({
        text: "加载中...",
        spinnerType: "fading-circle",
      });
      this.username = this.$route.query.username;
      const id = this.$route.query.userid;
      const starttime = this.$route.query.stime;
      const endtime = this.$route.query.etime;
      const token = window.sessionStorage.getItem("cat_token");
      this.$axios
        .get("api/statistic", {
          params: { userid: id, stime: starttime, etime: endtime },
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          Indicator.close();
          this.detail = res.data;
          // console.log(res);
        })
        .catch((err) => {
          // console.log(id);
          Indicator.close();
          this.showToast("加载失败，请重试");
          // console.log(err);
        });
    },
    showToast(mes) {
      this.toastInstanse = Toast({
        message: mes,
        position: "middle",
        duration: 1000,
      });
    },
  },
};
</script>
<style>
#title {
  background-color: #ef4f4f;
  font-size: 20px;
  height: 50px;
}
.card {
  margin: 10px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
}
.aboutUser {
  text-align: center;
  padding: 10px;
}
</style>