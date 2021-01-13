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
<!--              <el-tab-pane>-->
<!--                <span slot="label"><i class="el-icon-s-tools"></i>路由器A</span>-->
<!--                <ipcard name="路由器A"></ipcard>-->
<!--              </el-tab-pane>-->
<!--              <el-tab-pane>-->
<!--                <span slot="label"><i class="el-icon-s-tools"></i>路由器B</span>-->
<!--                <ipcard name="路由器B"></ipcard>-->
<!--              </el-tab-pane>-->
              <el-tab-pane>
                <span slot="label"><i class="el-icon-upload"></i>交换机</span>
                <upload-card address=" "></upload-card>
              </el-tab-pane>
              <el-tab-pane>
                <span slot="label"><i class="el-icon-upload"></i>中心路由器</span>
                <upload-card address=" "></upload-card>
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
              <el-input type="textarea" ref="input" class="commandBoard" rows="20" v-model="command" resize="none"
                        v-on:keydown.delete.stop="banDelete($event)"></el-input>
            </el-row>
            <div class="buttonArea">
              <el-button type="primary" v-on:click="sendCommand" icon="el-icon-thumb" :loading="loading">开始配置
              </el-button>
              <el-button type="primary" v-on:click="ping" icon="el-icon-magic-stick" :loading="loading">ping
              </el-button>
              <el-button type="primary" v-on:click="down" icon="el-icon-sort-down" :loading="loading">down
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
// import ipcard from "@/components/ipCard";
import uploadCard from "@/components/uploadCard";


export default {
  name: "index",
  components: {
    // ipcard,
    uploadCard
  },
  data() {
    return {
      show: true,
      loading: false,
      command: "",
      // commandList: [
      //   {command: "命令1"},
      //   {command: "命令2"},
      //   {command: "命令3"},
      // ]
    }
  },
  methods: {
    banDelete($event) {
      $event.preventDefault();
    },
    sendCommand() {
      const websocket = new WebSocket("ws://localhost:8090/socket");
      const that = this;

      websocket.onopen = function () {
        that.command = that.command.concat("正  在  配  置 , 请 稍 候\n\n");
        setTimeout(() => {
          that.command = that.command.concat("---------Loading---------\n\n");
        }, 1000)
        setTimeout(() => {
          websocket.send("");
        }, 1000);
      }

      websocket.onmessage = function (event) {
        that.command = that.command.concat(event['data']).concat("\n")
      }

      websocket.onclose = function () {

      }

      websocket.onerror = function () {
        that.$notify.error({
          title: '错误',
          message: 'websocket无法建立连接'
        });
      }

      window.onbeforeunload = function () {
        websocket.close();
      }

      // this.loading = true;
      // await this.$axios.get('http://localhost:8080/test', {timeout: 1000 * 60 * 60}).then(res => {
      //   this.loading = false;
      //   this.$notify({
      //     title: '配置成功',
      //     type: 'success',
      //     offset: 50
      //   });
      //   this.command = this.command.concat(res.data['results']);
      // }).catch(error => {
      //   this.$message({
      //     message: error,
      //     type: 'error',
      //     showClose: true
      //   });
      // })
    },
    ping() {
      this.$axios.get('', {timeout: 1000 * 60 * 60}).then(res => {
        console.log(res);
      }).catch(error => {
        console.log(error);
      })
    },
    down() {
      this.$axios.get('', {timeout: 1000 * 60 * 60}).then(res => {
        console.log(res);
      }).catch(error => {
        console.log(error);
      })
    },
    // /**
    //  * 根据commandList里命令自动配置
    //  * @returns {Promise<void>}
    //  */
    // async startConfigure() {
    //   let i = 0;
    //   for (i = 0; i < this.commandList.length; i++) {
    //     const curCommand = this.commandList[i]["command"];
    //     this.command = this.command.concat(curCommand).concat("\n");
    //     await this.sendCommand();
    //     this.command = this.command.concat("\n");
    //   }
    // },
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
  justify-content: space-around;
}
</style>