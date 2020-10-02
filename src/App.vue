<template>
  <div id="app">
    <div id="nav">
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->
    </div>
    <router-view/>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  text-decoration: none;
  list-style: none;
}
.mint-toast{
  width: 50% !important;
  padding: 40px !important;
}
body {
  background-color: #e1e1e1;

}
</style>
