<template>
  <div>
    <div v-show="show">
      <el-container class="container">
        <el-aside class="asideArea" width="600px">
          <div class="topologyArea">
            <img class="topology" alt="拓扑图.jpg" src="../assets/topology.png">
          </div>
          <div class="configurationArea">

            <el-tabs class="tabs" type="border-card" :stretch="true">
              <el-tab-pane>
                <span slot="label"><i class="el-icon-upload2"></i>交换机</span>
                <upload-card :address="'http://'+ip+'/uploadfile'"></upload-card>
              </el-tab-pane>
              <el-tab-pane>
                <span slot="label"><i class="el-icon-upload2"></i>RTA</span>
                <upload-card :address="'http://'+ip+'/uploadfile'"></upload-card>
              </el-tab-pane>
              <el-tab-pane>
                <span slot="label"><i class="el-icon-upload2"></i>RTB</span>
                <upload-card :address="'http://'+ip+'/uploadfile'"></upload-card>
              </el-tab-pane>
              <el-tab-pane>
                <span slot="label"><i class="el-icon-upload2"></i>RTC</span>
                <upload-card :address="'http://'+ip+'/uploadfile'"></upload-card>
              </el-tab-pane>
            </el-tabs>

          </div>
        </el-aside>
        <el-main>
          <div class="commandArea">
            <el-row class="loadingArea" v-loading="loading"
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(0, 0, 0, 0.8)">
              <el-input id="text" type="textarea" ref="input" class="commandBoard" rows="20" v-model="command"
                        resize="none"
                        v-on:keydown.delete.stop="banDelete($event)"></el-input>
            </el-row>
            <div class="buttonArea">
              <el-button type="primary" v-on:click="sendCommand('switch')" icon="el-icon-thumb" :loading="loading">配置交换机
              </el-button>
              <el-dropdown split-button type="primary" icon="el-icon-thumb" v-on:command="changeButton"
                           v-on:click="sendCommand('router')">
                配置{{ routerType }}
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="RTA">RTA</el-dropdown-item>
                  <el-dropdown-item command="RTB">RTB</el-dropdown-item>
                  <el-dropdown-item command="RTC">RTC</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <el-popover trigger="click">
                <ping-card v-bind:ip="ip" v-on:getPing="getPingResult"></ping-card>
                <el-button type="primary" slot="reference" icon="el-icon-magic-stick">ping</el-button>
              </el-popover>
              <el-button type="primary" v-on:click="sendCommand('shutdown')" icon="el-icon-sort-down">{{ downOrOn }}
              </el-button>
              <el-button type="primary" v-on:click="clearAll" icon="el-icon-remove-outline">清除所有
              </el-button>
            </div>
          </div>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
import uploadCard from "@/components/uploadCard";
import pingCard from "@/components/pingCard";

export default {
  name: "index",
  components: {
    pingCard,
    uploadCard
  },
  data() {
    return {
      ip: "172.19.166.52:8080",
      show: true,
      loading: false,
      command: "",
      sourceIp: "",
      targetIp: "",
      routerType: "RTA",
      downOrOn: "down",
    }
  },
  methods: {
    banDelete($event) {
      $event.preventDefault();
    },
    changeButton(command) {
      this.routerType = command;
    },
    sendCommand(type) {
      const websocket = new WebSocket("ws://" + this.ip + "/gettelnet");
      const that = this;
      this.loading = true;

      websocket.onopen = function () {
        that.loading = false;
        if (type === 'switch')
          that.command = that.command.concat("正  在  配  置").concat(" 交 换 机 , 请 稍 候\n\n");
        else if (type === 'shutdown') {
          that.command = that.command.concat("正 在 shutdown , 请 稍 候\n\n");
          type = that.downOrOn;
          that.downOrOn = (that.downOrOn === 'down' ? 'on' : 'down');
        } else if (type === 'router') {
          that.command = that.command.concat("正 在 配 置 " + that.routerType + " , 请稍候\n\n");
          type = that.routerType
        }

        setTimeout(() => {
          websocket.send(type);
        }, 1000);
      }

      websocket.onmessage = function (event) {
        that.command = that.command.concat(event['data']).concat("\n");
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
    },
    getPingResult(data) {
      this.command = this.command.concat(data).concat("\n");
    },
    clearAll() {
      this.command = "";
      this.$notify({
        title: '清除成功',
        type: 'success',
        offset: 50
      });
    }
  }
}
</script>

<style scoped>
.container {
  align-items: center;
  justify-content: center;
  height: 570px;
}

.asideArea {
  margin-left: 50px;
}

.topologyArea {
  height: 120px;
  text-align: center;
}

.topology {
  width: 370px;
  height: 160px;
}

.configurationArea {
  margin-top: 60px;
}

.tabs {
  height: 330px;
}

.loadingArea {
  width: 600px;
  margin-top: 20px;
}

.commandArea {
  width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.commandBoard {
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}

.buttonArea {
  width: 600px;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}
</style>