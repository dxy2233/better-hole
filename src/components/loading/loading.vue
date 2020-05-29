<script>
export default {
  name: 'Loading',
  data: () => ({
    show: false,
    text: '',
  }),
  render() {
    return (
      <div v-show={this.show} class="loading">
        loading...
      </div>
    )
  },
}
</script>

<style lang="scss" scoped>
.loading {
  z-index: 10000;
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  opacity: 0.5;
  background: #000;
  color: #fff;
  font-size: 36px;
  text-align: center;
  line-height: 100vh;
}
</style>
