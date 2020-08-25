<template>
  <stream-chat-u-i :show-chat-if-available="true" :show-stream-if-available="false"/>
</template>

<script>
import StreamChatUI from "../stream/StreamChatUI";
export default {
  name: "ChatOnlyView",
  components: {StreamChatUI}
}
</script>
