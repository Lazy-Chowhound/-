<template>
  <div>
    <el-collapse-transition>
      <div v-show="show">
        <el-container>
          <el-header>
            <label class="title">计 网 大 作 业</label>
          </el-header>

          <el-main>
            <el-form v-bind:model="ruleForm" v-bind:rules="rules" ref="ruleForm" label-width="100px"
                     class="demo-ruleForm">
              <el-form-item label="用户名" prop="username">
                <el-input v-model="ruleForm.username" prefix-icon="el-icon-user" clearable></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="ruleForm.password" prefix-icon="el-icon-lock" show-password clearable></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" v-on:click="submitForm('ruleForm')" icon="el-icon-mouse">登录</el-button>
                <el-button v-on:click="resetForm('ruleForm')" icon="el-icon-refresh-left">重置</el-button>
              </el-form-item>
            </el-form>
          </el-main>
        </el-container>
      </div>
    </el-collapse-transition>
  </div>

</template>

<script>
import ElementUI from 'element-ui';

export default {
  name: "Login",
  data() {
    return {
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请选择密码'}
        ]
      },
      show: true
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const username = this.ruleForm.username;
          const password = this.ruleForm.password;
          if (username === 'admin' && password === '123456') {
            this.$message({
              message: '登录成功',
              type: 'success'
            });
            this.show = false;
            setTimeout(() => {
              this.$router.push("/commandPage");
            }, 1500);
          } else {
            ElementUI.MessageBox.alert("用户名/密码错误", "提示");
          }
        } else {
          ElementUI.MessageBox.alert("呀~~您好像还没有输入完东西呢~");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>


<style scoped>
.el-container {
  text-align: center;
}

.el-header, .el-footer {

  text-align: center;
  line-height: 60px;
}

.el-main {
  text-align: center;
  line-height: 160px;
}

.title {
  height: 60%;
  margin-top: 20px;
  font-size: 20px;
}

.demo-ruleForm {
  max-width: 500px;
  margin-left: 460px;
}

.el-input {
  width: 350px;
  font-size: 17px;
}

.el-button {
  font-size: medium;
  margin-right: 40px;
}
</style>