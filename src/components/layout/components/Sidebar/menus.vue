<template>
  <li v-if="item.meta">
    <!-- <template v-if="item.children">
      <svg-icon v-if="item.meta.icon !== ''" :icon-class="item.meta.icon" />
      <li @click="toggle">
        {{ item.meta.title }}
        <span class="toggle">
          <template v-if="toggleData[item.path.slice(1)]">-</template>
          <template v-else>+</template>
        </span>
      </li>
      <menus
        v-show="toggleData[item.path.slice(1)]"
        v-for="child in item.children"
        :key="child.path"
        :item="child"
        :base-path="resolvePath(child.path)"
      />
    </template> -->

    <template>
      <router-link :to="basePath" :class="{ active: $route.path === basePath }">
        <svg-icon v-if="item.meta.icon !== ''" :icon-class="item.meta.icon" />
        {{ item.meta.title }}
      </router-link>
    </template>
  </li>
</template>

<script>
import path from 'path'
import { isExternal } from '@/utils/validate'

export default {
  name: 'Menus',
  props: {
    item: {
      type: Object,
      required: true,
    },
    basePath: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      toggleData: {},
    }
  },
  created() {
    if (this.item.children) {
      this.$set(this.toggleData, this.item.path.slice(1), false)
    }
  },
  methods: {
    resolvePath(routePath) {
      if (isExternal(routePath)) return routePath
      return path.resolve(this.basePath, routePath)
    },
    toggle() {
      this.toggleData[this.item.path.slice(1)] = !this.toggleData[
        this.item.path.slice(1)
      ]
    },
  },
}
</script>

<style lang="scss" scoped>
a {
  display: block;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #2e80d6;
  &:link {
    color: #fff;
  }
  &:hover {
    transition: all 1s ease-in-out;
    background: rgba(21, 138, 231, 1);
  }
}
.active {
  background: #d0b20f;
  // border-left: 3px solid #b3de01;
}
li {
  text-indent: 13px;
  // .toggle {
  //   float: right;
  //   margin-top: 12px;
  //   margin-right: 20px;
  //   width: 15px;
  //   height: 15px;
  //   line-height: 15px;
  //   text-align: center;
  //   text-indent: 0;
  //   cursor: pointer;
  // }
}
// li {
//   &:not(:first-child) {
//     margin-top: 1px;
//   }
//   > li {
//     height: 40px;
//     line-height: 40px;
//     &:first-child {
//       background: url(../../../../assets/img/nav_bg.png) repeat-x;
//       &:hover {
//         background: url(../../../../assets/img/nav_bg_h.png) repeat-x;
//       }
//     }
//   }
// }
</style>
