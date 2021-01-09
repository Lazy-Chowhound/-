<template>
  <div>
    <div v-show="show">
      <el-container class="container">
        <el-aside class="asideArea" width="600px">
          <div class="configurationArea">

            <el-tabs type="border-card" :stretch="true">
              <el-tab-pane>
                <span slot="label"><i class="el-icon-s-tools"></i>路由器A</span>
                <ipcard name="路由器A"></ipcard>
              </el-tab-pane>
              <el-tab-pane>
                <span slot="label"><i class="el-icon-s-tools"></i>路由器B</span>
                <ipcard name="路由器B"></ipcard>
              </el-tab-pane>
              <el-tab-pane label="验证">
                <span slot="label"><i class="el-icon-info"></i>验证</span>
                <el-card class="box-card">
                  <div slot="header">验证</div>
                  <div class="item">验证</div>
                </el-card>
              </el-tab-pane>
              <el-tab-pane label="待定">
                <el-card class="box-card">
                  <div slot="header">待定</div>
                  <div class="item">待定</div>
                </el-card>
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
import ipcard from "@/components/ipCard";

export default {
  name: "index",
  components: {
    ipcard
  },
  data() {
    return {
      show: true,
      loading: false,
      command: "",
      commandList: [
        {command: "命令1"},
        {command: "命令2"},
        {command: "命令3"},
      ]
    }
  },
  methods: {
    banDelete($event) {
      $event.preventDefault();
    },
    async sendCommand() {
      this.loading = true;
      await this.$axios.get('http://localhost:8080/test', {timeout: 1000 * 60 * 60}).then(res => {
        console.log(res.data);
        this.loading = false;
        this.$notify({
          title: '配置成功',
          type: 'success',
          offset: 50
        });
        this.command = this.command.concat(res.data['results']);
      }).catch(error => {
        this.$message({
          message: error,
          type: 'error',
          showClose: true
        });
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
}

.asideArea {
  margin-left: 50px;
}

.configurationArea {
  margin: 0 auto;
}

.box-card {
  width: 565px;
  height: 200px;
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
  width: 400px;
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
}
</style>