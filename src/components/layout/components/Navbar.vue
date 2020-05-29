<template>
  <div class="navbar">
    <img src="../../../assets/img/logo.png" title="三同步管理平台" />
    <div class="navbar-info">
      <div>
        <span><svg-icon icon-class="user" /></span>{{ info.name }}
      </div>
      欢迎登录 <em>|</em>
      <div @click="openDialog">修改密码</div>
      <em>|</em>
      <div @click="logout">退出</div>
    </div>

    <baseDialog :visible.sync="dialog" @closed="closedDialog">
      <template #title>修改密码</template>
      <baseForm ref="pwdForm" :form="form" :rules="rules">
        <baseFormItem label="旧密码" prop="oldPassword" required>
          <input type="password" v-model="form.oldPassword" />
        </baseFormItem>
        <baseFormItem label="新密码" prop="newPassword" required>
          <input type="password" v-model="form.newPassword" />
        </baseFormItem>
        <button type="button" @click="submit">保存</button>
      </baseForm>
    </baseDialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { updatePassword } from '@/api/user'
import { salt } from '@/utils/validate'
import sha1 from 'crypto-js/sha1'
import { pwd } from '@/utils/validate'

export default {
  name: 'Navbar',
  data() {
    return {
      dialog: false,
      form: {
        userId: '',
        oldPassword: '',
        newPassword: '',
      },
      rules: {
        oldPassword: [
          { required: true, message: '请输入旧密码', trigger: 'blur' },
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          {
            validator: pwd,
            message: '密码只能由字母、数字、特殊符号，长度在 6-32 之间!',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  methods: {
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push({ name: 'Login', params: { reset: true } })
    },
    openDialog() {
      this.form.userId = this.info.id
      this.dialog = true
    },
    closedDialog() {
      Object.assign(this.$data.form, this.$options.data().form)
      this.$refs.pwdForm.clearErr()
    },
    submit() {
      if (!this.$refs.pwdForm.validate()) return
      let form = JSON.parse(JSON.stringify(this.form))
      form.oldPassword = sha1(salt(form.oldPassword)).toString()
      form.newPassword = sha1(salt(form.newPassword)).toString()
      updatePassword(form).then((res) => {
        this.$message({ content: res.message, type: 'success' })
        this.dialog = false
      })
    },
  },
  computed: {
    ...mapGetters(['info']),
  },
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 60px;
  overflow: hidden;
  position: relative;
  background: url('../../../assets/img/toppic.png') no-repeat;
  background-size: 100% 100%;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  img {
    height: 80%;
    width: auto;
    margin: 0 0 0 20px;
  }
  .navbar-info {
    color: #fff;
    display: flex;
    align-items: center;
    margin: 0 20px 0 0;
    height: 50px;
    line-height: 50px;
    em {
      padding: 0 10px;
      font-style: normal;
    }
    div {
      cursor: pointer;
      span {
        display: inline-block;
        background-color: hsla(0, 0%, 100%, 0.1);
        width: 38px;
        height: 38px;
        line-height: 38px;
        border-radius: 50%;
        text-align: center;
        font-size: 20px;
        margin: 0 5px;
      }
    }
    div:first-child {
      margin: 0 10px 0 0;
    }
  }
}
</style>
