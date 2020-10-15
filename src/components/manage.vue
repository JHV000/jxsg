<template>
  <div>
    <div class="member-list" v-for="(item, index) in employ" v-bind:key="index">
      <mt-cell class="m-cell" :title="item.user_name">
        <mt-button
          size="small"
          @click.native="deleteUser(item.user_id, item.user_name)"
          type="danger"
          icon="back"
          >删除</mt-button
        >
      </mt-cell>
    </div>
  </div>
</template>
<script>
import { Indicator, MessageBox, Toast } from "mint-ui";
const token = window.sessionStorage.getItem("cat_token");
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

      this.$axios
        .get("api/admin/userlist", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          Indicator.close();
          this.employ = res.data;
          // console.log(this.employ);
        })
        .catch((err)=>{
           if (err.message == "Network Error") {
            this.showToast("网络错误");
          } else {
            this.showToast("加载失败，请重试");
          }
        })
    },
    deleteUser(id, name) {
      MessageBox.confirm("确定删除员工" + "<b>" + name + "</b>吗？")
        .then(() => {
          this.$axios
            .delete("api/admin/user/delete/" + id, {
              headers: {
                Authorization: "Bearer " + token,
              },
            })
            .then((res) => {
              this.showToast("删除成功！");
              setTimeout(() => {
                this.getUser();
              }, 1000);

              // console.log(res);
            });
        })
        .catch((err) => {
          this.showToast("删除失败，请重试");
          // console.log(err);
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
.member-list .m-cell .mint-cell-text {
  font-size: 20px;
}
</style>