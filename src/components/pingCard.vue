<template>
  <el-card class="box-card" :body-style="bodyStyle">
    <div slot="header">
      <span>ping</span>
      <el-button style="float: right; padding: 3px 0" type="text" v-on:click="ping">开ping</el-button>
    </div>
    <div class="item">
      <div class="sourceIpArea">
        <span>源 IP</span>
        <el-radio-group class="sourceOption" v-model="source">
          <el-radio-button label="RTA"></el-radio-button>
          <el-radio-button label="RTB"></el-radio-button>
          <el-radio-button label="RTC"></el-radio-button>
        </el-radio-group>
      </div>
      <div class="targetIpArea">
        <div><span>目的IP:</span></div>
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
    </div>
  </el-card>
</template>

<script>
export default {
  name: "pingCard",
  props: ['ip'],
  data() {
    return {
      part1: '',
      part2: '',
      part3: '',
      part4: '',
      source: '',
      bodyStyle: {"padding": '20px', "height": "160px", "display": "flex", "align-items": "center"}
    }
  },
  methods: {
    checkIp(ipPart) {
      const ip = Number(ipPart)
      return !(ipPart === "" || isNaN(ip) || ip % 1 !== 0 || ip < 0 || ip > 255);
    },
    ping() {
      if (this.source === '') {
        this.$notify.error({
          title: 'ping错误',
          message: '未选择源IP',
          position: 'top-right',
          offset: 50
        })
      } else if (this.checkIp(this.part1) && this.checkIp(this.part2) && this.checkIp(this.part3) && this.checkIp(this.part4)) {
        const targetIp = this.getTargetIp;
        this.$confirm("是否确认ping", "提示", {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$emit('getPing', '正 在 Ping , 请 稍 候\n\n');
          const websocket = new WebSocket("ws://" + this.ip + "/gettelnet");
          const that = this;
          this.loading = true;

          websocket.onopen = function () {
            setTimeout(() => {
              websocket.send("ping," + that.source + "," + targetIp);
            }, 1000);
          }

          websocket.onmessage = function (event) {
            that.$emit('getPing', event['data']);
          }

          websocket.onclose = function () {

          }

          websocket.onerror = function () {
            that.$notify.error({
              title: '错误',
              message: 'websocket无法建立连接'
            });
            that.loading = false;
          }

          window.onbeforeunload = function () {
            websocket.close();
          }

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消ping'
          });
        })
      } else {
        this.$notify.error({
          title: 'ping错误',
          message: 'ip格式出现了问题',
          position: 'top-right',
          offset: 50
        })
      }
    }
  },
  computed: {
    getTargetIp() {
      return this.part1 + "." + this.part2 + "." + this.part3 + "." + this.part4;
    },
  }
}
</script>

<style scoped>
.box-card {
  height: 260px;
}

.item {
  display: flex;
  height: 140px;
  width: 530px;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.sourceIpArea {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.sourceOption {
  margin-top: 10px;
}

.targetIpArea {
  display: flex;
  flex-direction: row;
  align-items: center;
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

.ip /deep/ .el-input__inner {
  text-align: center;
}
</style>