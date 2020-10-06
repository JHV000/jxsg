<template>
  <div>
    <div class="member-list" v-for="(item,index) in employ" v-bind:key="index">
       <mt-cell class="m-cell" :title="item.name">  
    <mt-button size="small" type="danger" icon="back">删除</mt-button>  
  </mt-cell>
  </div>
  </div>
</template>
<script>
export default {
  name: "manage",
  data() {
    return {
      employ:[
        {
          name:'景汉伟',
        },
        {
          name:'景汉伟',
        },
        {
          name:'景汉伟',
        },
        {
          name:'景汉伟',
        },
      ]
    };
  },
  methods: {},
};
</script>
<style>
.member-list .m-cell .mint-cell-text {
  font-size: 20px;
}
</style>