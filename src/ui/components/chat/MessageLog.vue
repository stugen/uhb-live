<template>
  <div class="messages" ref="container">
    <message v-for="msg in messages" :msg="msg" :key="msg.uuid"/>
  </div>
</template>

<script>
import Message from "./Message";
export default {
name: "MessageLog",
  components: {Message},
  props: ['messages'],
  methods: {
    scrollToBottom () {
      const element = this.$refs.container
      element.scrollTo(0, element.scrollHeight)
    }
  },
  watch: {
    messages (newVal, oldVal) {
      this.$nextTick(this.scrollToBottom)
    }
  }
}
</script>

<style scoped>
.messages {
  overflow-y: auto;
  height: calc(100% - 3.5rem);
}
</style>
