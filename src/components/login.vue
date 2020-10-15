<template>
  <div class="login">
    <mt-field
      class="login-cell"
      label="用户名"
      placeholder="请输入用户名"
      v-model="username"
    ></mt-field>
    <mt-field
      class="login-cell"
      label="密码"
      placeholder="请输入密码"
      type="password"
      v-model="password"
    ></mt-field>
    <mt-button class="login-btn" size="large" @click="login" type="danger"
      >登录</mt-button
    >
  </div>
</template>
<script>
import { Indicator, Toast } from "mint-ui";
export default {
  name: "login",
  data() {
    return {
      username: "",
      password: "",
      address: "/sign",
    };
  },
  methods: {
    login() {
      Indicator.open({
        text: "登录中...",
        spinnerType: "fading-circle",
      });
      if (this.username == "jxsg") {
        this.address = "/author";
      }
      this.$axios
        .post("/api/auth/login", {
          name: this.username,
          password: this.password,
        })
        .then((res) => {
          window.sessionStorage.setItem("cat_token", res.data.access_token);
          // console.log(res);
          Indicator.close();
          if (res.result.code == 1) {
            this.$router.push({
              path: this.address,
              // query: {
              //   token : res.data.access_token
              // },
            });
          }
        })
        .catch((err) => {
          Indicator.close();

          if (err.message == "Network Error"||err.response.status==500) {
            this.showToast("网络错误");
          } else {
            this.showToast("用户名或密码错误，请重试");
          }
          // console.log(err.message);
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
.mint-tab-item-label {
  font-size: 15px !important;
}
.mint-navbar .mint-tab-item.is-selected {
  background-color: #ef4f4f;
  color: #fff !important;
}

.login-cell {
  margin-top: 20px;
  border-radius: 50px;
}
.login .login-btn {
  margin-top: 30px;
  border-radius: 50px;
}
</style>