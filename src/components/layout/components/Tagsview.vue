<template>
  <div class="tags">
    <ul>
      <li
        v-for="(item, index) in tags"
        :key="index"
        @click="changeRouter(item.path)"
        :class="{ active: $route.fullPath === item.path }"
      >
        {{ item.title }}
        <span v-if="tags.length > 1" @click.stop="deleteTag(index)">
          <svg-icon icon-class="close" />
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Tags',
  data() {
    return {
      tags: [], // { title: '', path: '', name: '' }
    }
  },
  created() {
    this.tags.push({
      title: this.$route.meta.title,
      path: this.$route.fullPath,
      name: this.$route.name,
    })
    this.$store.dispatch('baseData/changeKeepRouters', this.tags)
  },
  watch: {
    $route(val) {
      const newRouter = this.tags.every((item) => item.path !== val.fullPath)
      if (newRouter)
        this.tags.push({
          title: val.meta.title,
          path: val.fullPath,
          name: val.name,
        })
      this.$store.dispatch('baseData/changeKeepRouters', this.tags)
    },
  },
  methods: {
    changeRouter(path) {
      if (this.$route.fullPath !== path) this.$router.push({ path: path })
    },
    deleteTag(index) {
      this.tags.splice(index, 1)
      index === 0
        ? this.changeRouter(this.tags[index].path)
        : this.changeRouter(this.tags[index - 1].path)
    },
  },
}
</script>

<style lang="scss" scoped>
.tags {
  box-sizing: border-box;
  @media (max-width: 1200px) {
    width: calc(100vw - 180px);
  }
  width: calc(100vw - 210px);
  height: 45px;
  background: #ebebed;
  border-bottom: 5px solid #018ad3;
  padding-left: 20px;
  padding-top: 6px;
  ul {
    overflow-x: auto;
    white-space: nowrap;
    li {
      display: inline-block;
      height: 32px;
      line-height: 32px;
      padding: 0 15px;
      font-size: 12px;
      color: #666;
      background: #fff;
      border: 1px solid #ccc;
      margin-right: 3px;
      text-align: center;
      cursor: pointer;
    }
    .active {
      background: #158ae7;
      color: #fff;
      border: 1px solid #158ae7;
    }
  }
  ul::-webkit-scrollbar {
    width: 0 !important;
  }
}
</style>
