<template>
  <stream-chat-u-i :show-chat-if-available="false" :show-stream-if-available="true"/>
</template>

<script>
import StreamChatUI from "../stream/StreamChatUI";
export default {
  name: "VideoView",
  components: {StreamChatUI}
}
</script>
