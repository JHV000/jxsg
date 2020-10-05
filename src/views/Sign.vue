<template>
  <div>
    <mt-header class="title" title="上班打卡">
    </mt-header>
    <div class="signpart">
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">打卡上班</mt-tab-item>
      <mt-tab-item id="2">查看记录</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container v-model="selected">

      <!-- 打卡界面 -->
      <mt-tab-container-item class="item" id="1">
       <sign-page v-bind:token="token"></sign-page>
      </mt-tab-container-item>
      
      <!-- 记录界面 -->
      <mt-tab-container-item id="2">
        <record-page></record-page>
      </mt-tab-container-item>
    </mt-tab-container>
    </div>
    
  </div>
</template>
<script>
import signPage from '@/components/signPage'
import recordPage from '@/components/recordPage'
export default {
  name: "Sign",
  components:{
      signPage,
      recordPage
  },
  data() {
    return {
        selected:"1",
        token:this.$route.query.token
    };
  },
  methods: {},
  
};
</script>
<style>
.title {
    background-color: #ef4f4f;
    font-size: 20px;
    height: 50px;
}
.signpart {
    margin-top: 20px;
}

</style>