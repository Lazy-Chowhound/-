<template>
  <el-card class="box-card" :body-style="bodystyle">
    <div slot="header" style="margin-left: 235px">
      <span>{{ name }}</span>
      <el-button style="float: right; padding: 3px 0" type="text" v-on:click="modify">确认修改</el-button>
    </div>
    <div class="item">
      <div><span>ip:</span></div>
      <div class="ipInput">
        <el-input class="ip" v-model="part1"></el-input>
        <span>.</span>
        <el-input class="ip" v-model="part2"></el-input>
        <span>.</span>
        <el-input class="ip" v-model="part3"></el-input>
        <span>.</span>
        <el-input class="ip" v-model="part4"></el-input>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "ipcard",
  props: ['name'],
  data() {
    return {
      part1: '',
      part2: '',
      part3: '',
      part4: '',
      bodystyle:{"padding": '20px',"height":"160px","display":"flex","align-items":"center"}
    }
  },
  methods: {
    checkIp(ipPart) {
      const ip = Number(ipPart)
      return !(ipPart === "" || isNaN(ip) || ip % 1 !== 0 || ip < 0 || ip > 255);
    },
    modify() {
      if (this.checkIp(this.part1) && this.checkIp(this.part2) && this.checkIp(this.part3) && this.checkIp(this.part4)) {
        const ip = this.completeIp;
        this.$confirm("是否确认更改ip", "提示", {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //请求后端

          this.$message({
            type: 'success',
            message: '修改成功!' + this.name + '的ip为:' + ip
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消修改'
          });
        })
      } else {
        this.$notify.error({
          title: '配置错误',
          message: 'ip格式出现了问题',
          position: 'top-left',
          offset: 50
        })
      }
    }
  },
  computed: {
    completeIp() {
      return this.part1 + "." + this.part2 + "." + this.part3 + "." + this.part4;
    }
  }
}
</script>

<style scoped>
.box-card{
  height:260px;
}

.item {
  display: flex;
  height: 140px;
  width: 530px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.ipInput {
  width: 430px;
  margin-left: 20px;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
}

.ip {
  width: 100px;
}
</style>