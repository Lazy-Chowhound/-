<template>
  <div>
    <el-collapse-transition>
      <div v-show="show">
        <div class="main">
          <el-input type="textarea" class="commandBoard" rows="20" v-model="command" resize="none"
                    v-on:keyup.enter.native="sendCommand" v-on:keydown.delete.stop="banDelete($event)"></el-input>
          <el-button type="primary" v-on:click="clearAll" icon="el-icon-remove-outline">清除所有</el-button>
        </div>
      </div>
    </el-collapse-transition>

  </div>
</template>

<script>

import * as qs from "qs";

export default {
  name: "index",
  data() {
    return {
      show: true,
      command: "",
    }
  },
  methods: {
    banDelete($event) {
      $event.preventDefault();
    },
    sendCommand() {
      const array = this.command.split('\n');
      this.$axios.post('http://localhost:8090/test', qs.stringify({
        command: array[array.length - 2]
      }), {timeout: 2000}).then(res => {
        this.command = this.command.concat('> ').concat(res.data).concat('\n');
      }).catch(error => {
        this.$message({
          message: error,
          type: 'error',
          showClose:true
        });
      })
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