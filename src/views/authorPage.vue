<template>
    <div>
        <mt-header id="title" title="管理界面">
    </mt-header>
    <div class="signpart">
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">员工管理</mt-tab-item>
      <mt-tab-item id="2">统计工资</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container class="m-tab-container" v-model="selected">
        
      <!-- 管理员工界面 -->
      <mt-tab-container-item class="item" id="1">
      <manage></manage>
      </mt-tab-container-item>
      
      <!-- 工资统计界面 -->
      <mt-tab-container-item id="2">
        <salary></salary>
      </mt-tab-container-item>
    </mt-tab-container>
    </div>
    </div>
</template>
<script>
import manage from '@/components/manage'
import salary from '@/components/salary'
export default {
    name:'authorPage',
    components:{
        manage,
        salary
    },
    data(){
        return{
            selected:'1'
        }
    },
    methods:{

    }
}
</script>
<style>
#title {
    background-color: #ef4f4f;
    font-size: 20px;
    height: 50px;
}
.signpart {
    margin-top: 20px;
}
.m-tab-container {
    width: 90%;
    margin: 30px auto;
}
</style>