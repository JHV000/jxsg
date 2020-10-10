<template>
  <div id="app">
    <div id="nav">
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->
    </div>
    <keep-alive>
      <router-view v-if="this.$route.meta.keepAlive"></router-view>
    </keep-alive>
    <!-- <router-view /> -->
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  text-decoration: none;
  list-style: none;
}
.mint-toast {
  width: 50% !important;
  padding: 40px !important;
}
.mint-tab-item {
  border-radius: 50px;
  border-bottom: 0px !important;
}
.mint-navbar {
  border-radius: 50px;
  width: 90%;
  margin: 0 auto;
}

body {
  background-color: #e1e1e1;
}
</style>
