<template>
  <div>
    <div class="member-list" v-for="(item, index) in employ" v-bind:key="index">
      <mt-cell class="m-cell" :title="item.user_name">
        <mt-button
          size="small"
          @click.native="deleteUser(item.user_id)"
          type="danger"
          icon="back"
          >删除</mt-button
        >
      </mt-cell>
    </div>
  </div>
</template>
<script>
import { Indicator } from "mint-ui"
export default {
  name: "manage",
  data() {
    return {
      employ: [],
    };
  },
  created() {
    this.getUser();
  },
  methods: {
    getUser() {
      Indicator.open({
        text: "加载中...",
        spinnerType: "fading-circle",
      });
      const token = window.sessionStorage.getItem("cat_token");
      this.$axios
        .get("api/admin/userlist", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          Indicator.close()
          this.employ = res.data;
          // console.log(this.employ);
        });
    },
    deleteUser(id){
console.log(id);
    }
  },
};
</script>
<style>
.member-list .m-cell .mint-cell-text {
  font-size: 20px;
}
</style>