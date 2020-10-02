<template>
  <div>
   
  </div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
  name: "recordPage",
  data() {
    return {
     
    };
  },
  methods: {
    register() {
      Indicator.open({
        text: "Loading...",
        spinnerType: "fading-circle",
      })
      if (this.username != "") {
        if (
          this.passwordFirst === this.passwordSecond &&
          this.passwordFirst != ""
        ) {
          this.$axios
            .post("/api/auth/register", {
              name: this.username,
              company: this.company,
              password: this.passwordFirst,
            })
            .then((res) => {
              Indicator.close();
              if (res.result.code === 1) {
                this.showToast("注册成功！请前往登录");
              } else {
                this.showToast("注册失败，请重试");
              }
              // console.log(res);
            });
        } else {
          this.showToast("两次密码不一致");
        }
      } else {
        this.showToast("请输入用户名");
      }
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

</style>