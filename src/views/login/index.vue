<template>
  <div class="login">
    <div class="logobox">
      <img src="../../assets/img/logo.png" />
    </div>
    <div class="wrap">
      <div class="content">
        <div class="title">
          <h3>个人登录</h3>
          <span>Login User</span>
        </div>
        <div class="box">
          <span>
            <svg-icon icon-class="accounts" />
            <input
              type="text"
              v-model="form.username"
              placeholder="您的账号"
              @keyup.enter="login"
            />
          </span>
          <span>
            <svg-icon icon-class="pass" />
            <input
              type="password"
              v-model="form.password"
              placeholder="您的密码"
              @keyup.enter="login"
            />
          </span>
          <span>
            <svg-icon icon-class="vcode" />
            <input
              type="text"
              v-model="form.verCode"
              placeholder="验证码"
              class="vcode"
              @keyup.enter="login"
            />
            <img @click="getVerifyImg" :src="verifyImg" alt="" />
          </span>
          <span><button @click="login">登 录</button></span>
        </div>
      </div>
    </div>
    <footer>©重庆贝特计算机系统工程有限公司</footer>
  </div>
</template>

<script>
import { getVerify } from '@/api/login'
import { salt } from '@/utils/validate'
import sha1 from 'crypto-js/sha1'

export default {
  name: 'Login',
  data() {
    return {
      form: {
        username: '',
        password: '',
        verCode: '',
        verCodeId: '',
      },
      verifyImg: '',
    }
  },
  created() {
    // 防止路由重复
    if (this.$route.params.reset) location.reload()
    this.getVerifyImg()
  },
  methods: {
    login() {
      let formData = new FormData()
      for (const i in this.form) formData.append(i, this.form[i])
      formData.set('password', sha1(salt(formData.get('password'))).toString())
      this.$store
        .dispatch('user/login', formData)
        .then(() => {
          this.$router.push({ path: '/hole' }).catch(() => {})
        })
        .catch(() => {
          this.form.verCode = ''
          this.getVerifyImg()
        })
    },
    getVerifyImg() {
      getVerify().then((res) => {
        this.verifyImg = res.data.base64
        this.form.verCodeId = res.data.verCodeId
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.login {
  width: 100vw;
  height: 100vh;
  background: #000618 url('../../assets/img/pagebg.jpg') no-repeat;
  background-size: 100% 100%;
  .logobox {
    width: 950px;
    padding: 30px 0 3% 0;
    margin: 0 auto;
  }
  .content {
    width: 450px;
    border: 5px solid #178ae5;
    height: 365px;
    margin: 0 auto;
    .title {
      height: 86px;
      line-height: 86px;
      color: #fff;
      padding-left: 30px;
      background: #178ae5;
      h3 {
        font-size: 22px;
        margin-right: 10px;
        display: inline-block;
      }
    }
    .box {
      text-align: center;
      background: rgba($color: #fff, $alpha: 0.9);
      width: 60%;
      height: 209px;
      padding: 35px 20%;
      span {
        display: block;
        position: relative;
        margin: 12px 0;
        text-align: left;
        svg {
          height: 100%;
          padding: 0 10px;
          position: absolute;
          color: #1975d2;
        }
        input {
          padding: 0 30px;
          width: 100%;
          height: 35px;
          border: 1px solid #8ad0ff;
          box-sizing: border-box;
          background: #fff;
        }
        input.vcode {
          padding: 0 30px;
          width: 60%;
          margin: 0 5px 0 0;
        }
        img {
          position: absolute;
        }
        button {
          background: #d0b20f;
          color: #fff;
          margin: 5px 0;
          height: 35px;
          width: 100%;
          &:hover {
            opacity: 0.9;
          }
        }
      }
    }
  }
  footer {
    position: fixed;
    bottom: 30px;
    font-size: 12px;
    color: #fff;
    text-align: center;
    width: 100%;
  }
}
</style>
