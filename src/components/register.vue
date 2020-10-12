<template>
  <div class="register">
    <mt-field
      class="r-cell"
      label="用户名"
      placeholder="请输入用户名"
      v-model="username"
    ></mt-field>
    <mt-field
      class="r-cell"
      label="密码"
      placeholder="请输入密码"
      type="password"
      v-model="passwordFirst"
    ></mt-field>
    <p class="pwdalert">密码长度至少为8位的英文字母或数字</p>
    <mt-field
      class="r-cell"
      label="确认密码"
      placeholder="请再次输入密码"
      type="password"
      v-model="passwordSecond"
    ></mt-field>
    <mt-radio
      class="r-cell"
      title="所在店面"
      v-model="company"
      align="right"
      :options="['G1', 'G2']"
    >
    </mt-radio>
    <mt-button size="large" class="r-btn" @click="register" type="danger"
      >立即注册</mt-button
    >
  </div>
</template>
<script>
import { Toast, Indicator } from "mint-ui";
export default {
  name: "register",
  data() {
    return {
      username: "",
      company: "G1",
      passwordFirst: "",
      passwordSecond: "",
      toastInstanse: null,
    };
  },
  methods: {
    register() {
      if (this.username != "") {
        if (
          this.passwordFirst === this.passwordSecond &&
          this.passwordFirst != ""
        ) {
          Indicator.open({
            text: "注册中...",
            spinnerType: "fading-circle",
          });
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
            })
            .catch((err) => {
              Indicator.close();
              this.showToast("用户名重复或请求错误");
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
.pwdalert {
  color: red;
  font-size: 10px;
}
.r-cell {
  margin-top: 20px;
  border-radius: 50px;
}
.register .r-btn {
  margin-top: 20px;
  border-radius: 50px;
}
</style>