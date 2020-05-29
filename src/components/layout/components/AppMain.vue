<template>
  <section class="app-main">
    <keep-alive :include="keepRouters.map((item) => item.name)">
      <router-view :key="$route.fullPath" />
    </keep-alive>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AppMain',
  computed: {
    ...mapGetters(['keepRouters']),
  },
}
</script>

<style lang="scss" scoped>
.app-main {
  height: calc(100vh - 60px - 45px);
  @media (max-width: 1200px) {
    width: calc(100vw - 180px);
  }
  width: calc(100vw - 210px);
  box-sizing: border-box;
  position: relative;
  overflow-y: auto;
  padding: 20px;
}
</style>
