<template>
  <div id="app">
    <div id="nav">
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->
       <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
     </keep-alive>
     <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
   
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
  width: 70%;
  margin: 0 auto;
}
.mint-navbar .mint-tab-item {
  padding: 10px 0 !important;
}
body {
  background: url(../src/assets/bg.jpg) no-repeat;
  background-color: #f7f7f7;
  background-size: 100% -200%;
}
</style>
