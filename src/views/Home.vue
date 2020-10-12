<template>
  <div class="main">
    <mt-header id="title" title="稷下时光"> </mt-header>
    <div class="home">
      <mt-navbar v-model="selected">
        <mt-tab-item id="1">登录</mt-tab-item>
        <mt-tab-item id="2">注册</mt-tab-item>
      </mt-navbar>

      <!-- tab-container -->
      <mt-tab-container class="tab-container" v-model="selected">
        <!-- 登录界面 -->
        <mt-tab-container-item id="1">
          <login></login>
        </mt-tab-container-item>

        <!-- 注册界面 -->
        <mt-tab-container-item id="2">
          <register></register>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import login from "@/components/login";
import register from "@/components/register";
export default {
  name: "Home",
  components: {
    login,
    register,
  },
  data() {
    return {
      selected: "1",
    };
  },
  methods: {},
};
</script>
<style>
#title {
  background-color: #ef4f4f;
  font-size: 20px;
  height: 50px;
}
.home {
  margin-top: 20px;
}
.home .tab-container {
  margin: 30px auto;
  width: 80%;
}
</style>
