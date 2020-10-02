<template>
  <div>
    <mt-field
      label="用户名"
      placeholder="请输入用户名"
      v-model="username"
    ></mt-field>
    <mt-field
      label="密码"
      placeholder="请输入密码"
      type="password"
      v-model="password"
    ></mt-field>
    <mt-button size="large" @click="login" type="danger">登录</mt-button>
  </div>
</template>
<script>
import { Indicator } from 'mint-ui';
export default {
  name: "login",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      Indicator.open({
        text: "Loading...",
        spinnerType: "fading-circle",
      })
      this.$axios
        .post("/api/auth/login", {
          name: this.username,
          password: this.password,
        })
        .then((res) => {
          Indicator.close();
          if(res.result.code==1){
            this.$router.replace('/sign')
          }
         
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
    font-size: 25px !important;
}
.mint-navbar .mint-tab-item.is-selected {
    background-color: #ef4f4f;
    color: #fff !important;
}
.mint-tab-container {
    margin: 60px auto;
    width: 80%;
}
.mint-cell {
    border-bottom: 1px solid !important;
    /* border-radius: 10px !important; */
    margin-top: 20px;
}
.mint-button {
  margin-top: 30px;
}
</style>