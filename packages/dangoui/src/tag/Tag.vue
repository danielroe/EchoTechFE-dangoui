<template>
  <div
    :class="[
      'du-tag',
      `du-tag--${colorName}`,
      `du-tag--${size}`,
      `du-tag--${bg}`,
      {
        'du-tag--bordered': bordered,
        'du-tag--round': round,
      },
    ]"
    :style="style"
    @click="handleClick"
  >
    <div v-if="icon" :class="`du-tag__icon du-tag__icon--${size}`">
      <DuIcon :name="icon" />
    </div>
    <slot />
    <div
      v-if="closeable"
      :class="`du-tag__close du-tag__close--${size}`"
      @click.stop="handleClose"
    >
      <DuIcon name="close-circle-filled" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { StyleValue, computed } from 'vue'
import DuIcon from '../icon/Icon.vue'

const props = withDefaults(
  defineProps<{
    /**
     * 颜色，可以使用主题预置的颜色或者十六进制颜色表示，也可以使用对象更灵活地来自定义颜色
     * TODO: 抽象到公用类型中，并可以外部扩展，这样就能进行主题定制与扩展
     *
     */
    color: string | { border: string; text: string; background: string }
    /**
     * 实心、淡色、透明
     */
    bg: 'solid' | 'soft' | 'ghost'
    /**
     * 大小
     */
    size: 'mini' | 'small' | 'medium' | 'large'
    /**
     * 是否为圆角
     */
    round: boolean
    /**
     * 是否带有边框
     */
    bordered: boolean
    /**
     * 是否可关闭（显示一个关闭按钮）
     */
    closeable: boolean
    /**
     * 左侧
     */
    icon?: string
  }>(),
  {
    color: 'primary',
    round: false,
    bordered: false,
    bg: 'soft',
    size: 'medium',
    closeable: false,
  },
)

const colorName = computed(() => {
  if (typeof props.color === 'string') {
    if (props.color.startsWith('#')) {
      return 'primary'
    }
    return props.color
  } else {
    return props.color
  }
})

const style = computed(() => {
  if (typeof props.color === 'string') {
    if (props.color.startsWith('#')) {
      return {
        '--du-c-tag': props.color,
        '--du-c-tag-soft-bg': props.color + '33',
        // 目前没有自动感知背景色亮暗的能力
        '--du-c-tag-solid-text': '#fff',
      }
    } else {
      return {
        '--du-c-tag': `var(--du-c-${props.color}-tag)`,
        '--du-c-tag-soft-bg': `var(--du-c-${props.color}-tag-soft-bg)`,
        '--du-c-tag-solid-text': `var(--du-c-${props.color}-tag-solid-text)`,
      }
    }
  } else {
    const s: StyleValue = {}
    s.color = props.color.text
    if (props.bg !== 'ghost') {
      s.background = props.color.background
    }
    if (props.bordered) {
      s.border = `1px solid ${props.color.border}`
    }
    return s
  }
})

const emit = defineEmits<{
  (e: 'click'): void
  (e: 'close'): void
}>()

function handleClose() {
  emit('close')
}

function handleClick() {
  emit('click')
}
</script>
