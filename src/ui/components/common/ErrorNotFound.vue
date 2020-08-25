<template>
  <div class="message is-danger">
    <div class="message-body">
      <b>{{ this.$t('common.notFound.head') }}</b>
      <br>
      <p>{{ this.$t('common.notFound.description') }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ErrorNotFound"
}
</script>
