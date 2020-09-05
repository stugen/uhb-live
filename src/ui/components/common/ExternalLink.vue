<template>
  <a :href="to" target="_blank" rel="noreferrer noopener">
    {{ translationKey ? $t(translationKey) : '' }}
    <slot></slot>
  </a>
</template>

<script>
export default {
  name: "ExternalLink",
  props: {
    to: {
      type: String,
      required: true
    },
    translationKey: {
      type: String,
      required: false
    }
  }
}
</script>
