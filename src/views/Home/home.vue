<template>
  <div class="home">
    <c-scroll
      :data="list"
      :pulldown="pulldown"
      @pulldown="loadData">
      <div class="content">
        <div class="item" v-for="item in list" :key="item.id">{{item}}</div>
      </div>
    </c-scroll>
  </div>
</template>

<script>
import CScroll from '@/components/common/C-Scroll.vue';
export default {
  data () {
    return {
      pulldown: true,
      list: []
    }
  },
  created () {
    this.initData()
  },
  methods: {
    initData () {

    }
  },
  components: {
    CScroll
  }
}
</script>

<style lang="scss" scoped>
@import "../../common/css/modules/global";
</style>