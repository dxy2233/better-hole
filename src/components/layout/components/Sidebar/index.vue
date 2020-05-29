<template>
  <ul class="sidebar">
    <menus
      v-for="route in allRoutes[1].children"
      :key="route.path"
      :item="route"
      :base-path="route.path"
    />
  </ul>
</template>

<script>
import { mapGetters } from 'vuex'
import menus from './menus'

export default {
  components: { menus },
  computed: {
    ...mapGetters(['allRoutes']),
  },
}
</script>

<style lang="scss" scoped>
.sidebar {
  width: 210px;
  overflow-y: auto;
  background: #014192;
  color: #fff;
}
</style>
