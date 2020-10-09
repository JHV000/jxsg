<template>
  <div>
    <mt-header id="title" title="打卡记录">
      <router-link to="/author" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
  </div>
</template>
<script>
import { Header, Indicator, Toast } from "mint-ui";
export default {
  name: "About",
  data() {
    return {};
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      Indicator.open({
        text: "加载中...",
        spinnerType: "fading-circle",
      });
      const userid = this.$route.query.userid;
      const stime = this.$route.query.stime;
      const etime = this.$route.query.etime;
      const token = window.sessionStorage.getItem("cat_token");
      this.$axios
        .get(
          "api/statistic",
          {
            userid: userid,
            stime: stime,
            etime: etime,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
        .then((res) => {
          Indicator.close();
          console.log(res);
        })
        .catch((err) => {
          Indicator.close();
          this.showToast("加载失败，请重试");
          console.log(err);
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
</style>