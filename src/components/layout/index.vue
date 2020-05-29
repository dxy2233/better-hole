<template>
  <div class="app-wrapper">
    <Navbar />
    <div class="main-wrapper">
      <Sidebar />
      <div>
        <Tags />
        <app-main />
      </div>
    </div>
  </div>
</template>

<script>
import { AppMain, Navbar, Sidebar, Tags } from './components'

export default {
  name: 'Layout',
  components: {
    AppMain,
    Navbar,
    Sidebar,
    Tags,
  },
}
</script>

<style lang="scss" scoped>
.app-wrapper {
  height: 100%;
  width: 100%;
  .main-wrapper {
    display: flex;
    height: calc(100vh - 60px);
  }
}
</style>
