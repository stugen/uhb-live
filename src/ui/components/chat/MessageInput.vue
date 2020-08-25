<template>
  <div class="msg-input w-100 is-flex">
    <span class="name" :class="{'editable': !this.$store.state.loginUser.loggedIn}" @click="clearName">{{ chatName }}:</span>
    <input type="text" class="input" :placeholder="this.$t('chat.enterMessage')" id="chat-input" ref="chatInput" @keyup.enter="sendMessage">
    <button class="button" title="Senden" @click="sendMessage">
      <span class="icon">
        <font-awesome-icon icon="paper-plane"/>
      </span>
    </button>
    <label class="is-hidden" for="chat-input">{{ this.$t('chat.enterMessage') }}</label>
  </div>
</template>

<script>
export default {
  name: "MessageInput",
  computed: {
    chatName () {
      return this.$store.state.loginUser.name || this.$store.state.chatUser
    }
  },
  methods: {
    sendMessage () {
      const text = this.$refs.chatInput.value
      this.$refs.chatInput.value = ''
      if (/^\s*$/.test(text)) {
        return
      }
      this.$emit('message', text)
    },
    clearName () {
      if (this.$store.state.loginUser.loggedIn) {
        return
      }
      this.$store.commit('setChatUser', '')
    }
  }
}
</script>

<style scoped lang="scss">
.name {
  height: 2.5em;
  padding: 0.5em 0.1em;
  display: inline-block;

  &.editable {
    cursor: pointer;

    &:hover, &:focus, &:active {
      text-decoration: underline;
      color: #21467a;
    }
  }
}
.msg-input {
  input {
    flex-grow: 1;
  }
}
</style>
