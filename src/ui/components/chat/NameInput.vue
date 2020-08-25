<template>
  <div class="msg-input w-100">
    <input type="text" class="input" :placeholder="this.$t('chat.enterNameToStart')" id="name-input" ref="nameInput" @keyup.enter="storeName" maxlength="48" pattern="[a-zA-Z.\-0-9 ]">
    <button class="button" title="Senden" @click="storeName">
      <span class="icon">
        <font-awesome-icon icon="user"/>
      </span>
    </button>
    <label class="is-hidden" for="name-input">{{ this.$t('chat.enterNameToStart') }}</label>
  </div>
</template>

<script>
export default {
  name: "NameInput",
  methods: {
    storeName () {
      const text = this.$refs.nameInput.value.replace(/[^a-zA-Z.\-0-9 ]/g, '')
      if (/^\s*$/.test(text)) {
        return
      }
      this.$store.commit('setChatUser', text)
      this.$emit('nameupdate')
    }
  }
}
</script>
