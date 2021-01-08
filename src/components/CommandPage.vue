<template>
  <div>
    <el-collapse-transition>
      <div v-show="show">
        <div class="main">
          <el-input type="textarea" ref="input" class="commandBoard" rows="20" v-model="command" resize="none"
                    v-on:keydown.delete.stop="banDelete($event)" v-loading="loading" ></el-input>
          <el-button type="primary" v-on:click="sendCommand" icon="el-icon-thumb" :loading="loading">开始配置</el-button>
          <el-button type="primary" v-on:click="clearAll" icon="el-icon-remove-outline">清除所有</el-button>
        </div>
      </div>
    </el-collapse-transition>

  </div>
</template>

<script>

export default {
  name: "index",
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
      await this.$axios.get('http://172.19.166.52:8080/gettelnet', {timeout: 100000}).then(res => {
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
.main {
  width: 600px;
  margin: 0 auto;
  text-align: center;
}

.commandBoard {
  margin-top: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}


.el-button {
  margin-top: 20px;
}
</style>