<template>
  <div :data-msg="msg.uuid">
    <time class="msg-time" :title="`${dateObj.toLocaleDateString()} ${dateObj.toLocaleTimeString()}`">{{dateObj.toLocaleTimeString()}}</time>
    <span class="msg-sender" :class="{'email-link': !!msg.senderMail}" @click="clickSender">
      {{msg.sender}}
      <font-awesome-icon icon="check-circle" v-if="msg.senderVerified" :title="this.$t('chat.verifiedAccount')"/>
    </span>
    <p class="content">{{msg.content}}</p>
  </div>
</template>

<script>
export default {
  name: "Message",
  props: ['msg'],
  data () {
    return {
      dateObj: new Date(this.msg.timestamp * 1000)
    }
  },
  methods: {
    clickSender () {
      if (!this.msg.email) {
        return;
      }
      window.open(`mailto:${this.msg.email}`)
    }
  }
}
</script>

<style scoped lang="scss">
div[data-msg] {
  margin: 1rem 2rem 1rem 1rem;
  background-color: #bfdaff;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  color: #282828;
  word-break: break-word;

  .content:not(:last-child) {
    margin-bottom: 0.5rem;
  }

  .msg-time {
    float: right;
    font-size: 0.8rem;
    color: #4a4a4a;
  }

  .msg-sender {
    font-weight: bold;

    &.email-link {
      color: #006aff;
      cursor: pointer;
      &:hover, &:focus, &:active {
        text-decoration: underline;
      }
    }

    .fa, .svg-inline--fa {
      margin-inline-start: 0.25em;
      color: #0e9e19;
    }
  }
}
</style>
