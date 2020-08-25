<template>
  <stream-chat-u-i :show-chat-if-available="true" :show-stream-if-available="true"/>
</template>

<script>
import StreamChatUI from "../stream/StreamChatUI";
export default {
  name: "StreamView",
  components: {StreamChatUI}
}
</script>
