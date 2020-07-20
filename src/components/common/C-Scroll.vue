<template>
  <div ref="wrapper">
    <slot />
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'CScroll',
  props: {
    /** 
     *  控制监听事件类型
     *  0 不派发scroll事件
     *  1 会非实时（屏幕滑动超过一定时间后）派发scroll事件 会截流
     *  2 会在屏幕滑动的过程中实时派发scroll事件 不会截留
     *  3 不仅在屏幕滑动中，而且在momentum滚动动画过程中仍能实时派发scroll事件
     */
    probeType: {
      type: Number,
      default: 1
    },
    /**
     * 点击列表是否派发click事件
     */
    click: {
      type: Boolean,
      default: true
    },
    /**
     *  是否派发touchend 事件
     */
    listenTouchend: {
      type: Boolean,
      default: false
    },
    /**
     *  传递的数据
     */
    data: {
      type: Array,
      default: null
    },
    /**
     *  是否派发滚动事件
     */
    listenScroll: {
      type: Boolean,
      default: false
    },
    /**
     *  是否开启横向滚动
     */
    scrollX: {
      type: Boolean,
      default: false
    },
    /**
     *  是否开启纵向滚动
     */
    scrollY: {
      type: Boolean,
      default: true
    },
    /**
     *  是否派发滚动到底部的事件，用于上拉加载
     */
    pullup: {
      type: Boolean,
      default: false
    },
    /**
     *  是否派发顶部下拉的事件，用于下拉刷新
     */
    pulldown: {
      type: Boolean,
      default: false
    },
    /**
     *  是否派发列表滚动开始的事件
     */
    beforeScroll: {
      type: Boolean,
      default: false
    },
    /**
     *  当数据更新后，刷新scroll的延时。
     */
    refreshDelay: {
      type: Number,
      default: 20
    }
  },
  mounted () {
    // 保证在DOM渲染完毕后初始化better-scroll
    setTimeout(() => {
      this._initScroll()
    }, 20);
  },
  methods: {
    _initScroll () {
      if(!this.$refs.wrapper) {
        return
      }
      // better-scroll的初始化
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click,
        scrollX: this.scrollX,
        scrollY: this.scrollY,
        observeDOM: false
      })
      let that = this
      // 监听滚动事件
      if(this.listenScroll) {
        this.scroll.on('scroll', pos => {
          that.$emit('scroll', pos)
        })
      }
      // 是否派发滚动到底部事件，用于上拉加载
      if (this.pullup) {
        this.scroll.on('scrollEnd', () => {
          // 滚动到底部
          if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
            that.$emit('scrollToEnd')
          }
        })
      }

      // 是否派发顶部下拉事件，用于下拉刷新
      if (this.pulldown) {
        this.scroll.on('touchend', (pos) => {
          // 下拉动作
          if (pos.y > 50) {
            that.$emit('pulldown')
          }
        })
      }

      // 是否派发列表滚动开始的事件
      if (this.beforeScroll) {
        this.scroll.on('beforeScrollStart', () => {
          that.$emit('beforeScroll')
        })
      }
    },
    disable() {
      // 代理better-scroll的disable方法
      this.scroll && this.scroll.disable()
    },
    enable() {
      // 代理better-scroll的enable方法
      this.scroll && this.scroll.enable()
    },
    refresh() {
      // 代理better-scroll的refresh方法
      this.scroll && this.scroll.refresh()
    },
    scrollTo() {
      // 代理better-scroll的scrollTo方法
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    scrollToElement() {
      // 代理better-scroll的scrollToElement方法
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    }
  },
  watch: {
    // 监听数据的变化，延时refreshDelay时间后调用refresh方法重新计算，保证滚动效果正常
    data() {
      setTimeout(() => {
        this.refresh()
      }, this.refreshDelay)
    }
  }
}
</script>

<style>

</style>