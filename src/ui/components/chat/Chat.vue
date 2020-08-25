<template>
  <aside class="chat">
    <message-log :messages="chatMessages"/>
    <message-input @message="handleNewMessage" v-if="nameSet"/>
    <name-input v-if="!nameSet"/>
  </aside>
</template>

<script>
import MessageLog from './MessageLog'
import MessageInput from './MessageInput'
import {initializeWs, sendMessage, setupPingInterval, joinRoom, handleMessage} from './handle-ws'
import NameInput from "./NameInput";

export default {
  name: 'Chat',
  components: {NameInput, MessageInput, MessageLog},
  props: {
    room: {
      type: String
    }
  },
  data () {
    return {
      chatMessages: [],
      socket: null,
      pingInterval: -1,
      errCount: 0
    }
  },
  computed: {
    nameSet () {
      return this.$store.state.loginUser.loggedIn || this.$store.state.chatUser !== ''
    }
  },
  methods: {
    handleNewMessage (text) {
      const sender = this.$store.state.loginUser.name || this.$store.state.chatUser
      const token = this.$store.state.loginUser.token || ''
      sendMessage(this.socket, sender, text, token)
    },
    connectWs () {
      this.socket = initializeWs()
      this.socket.onopen = (() => {
        joinRoom(this.socket, this.room)
        this.pingInterval = setupPingInterval(this.socket)
        this.chatMessages = []
        this.errCount = 0
      })
      this.socket.onclose = (() => {
        window.clearInterval(this.pingInterval)
        if (this.errCount < 10) {
          setTimeout(this.connectWs, 5000)
          this.errCount += 1
        }
      })
      this.socket.onmessage = (msg => {
        if (msg.type !== 'message') {
          return
        }
        const data = handleMessage(this.socket, msg.data)
        if (!!data) {
          if (this.chatMessages.length >= 100) {
            this.chatMessages.shift()
          }
          this.chatMessages.push(data)
        }
      })
    }
  },
  mounted () {
    this.connectWs()
  }
}
</script>

<style scoped lang="scss">
.chat {
  height: 26.75vw;
  background-color: #f3f3f3;
  padding: 1rem 0 0.25rem 0;
  position: relative;
}

.msg-input {
  height: 3rem;
  padding: 0.5rem 1rem 0 1rem;
  display: flex;

  input {
    flex-grow: 1;
  }

  button {
    margin-left: 0.5rem;
  }
}
</style>
