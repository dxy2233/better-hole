<template>
  <div class="login">
    <div class="logobox">
      <img src="../../assets/img/logo.png" />
    </div>
    <div class="wrap">
      <div class="content">
        <img src="../../assets/img/loginpic.png" />
        <div class="box">
          <h3>个人登录</h3>
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
  background: url('../../assets/img/pagebg.jpg') no-repeat;
  background-size: 100% 100%;
  .logobox,
  .content {
    padding: 30px 0;
    width: 950px;
    margin: 0 auto;
  }
  .wrap {
    margin: 1% 0 0 0;
    background: rgba(0, 100, 255, 0.6);
    .content {
      padding: 50px 0;
      width: 780px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .box {
        text-align: center;
        color: #fff;
        width: 260px;
        height: 240px;
        background: url('../../assets/img/line.png') no-repeat center;
        padding: 40px 30px;
        span {
          display: block;
          position: relative;
          margin: 12px 0;
          text-align: left;
          svg {
            height: 100%;
            padding: 0 10px;
            position: absolute;
            color: #0065ff;
          }
          input {
            padding: 0 30px;
            width: 100%;
            height: 35px;
            box-sizing: border-box;
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
            background: url('../../assets/img/buttonbg.png') repeat-x;
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
