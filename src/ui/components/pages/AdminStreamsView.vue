<template>
  <div class="admin">
    <admin-streams v-if="permitted"/>
    <main class="container px-4" v-if="!permitted">
      <error-not-found/>
    </main>
  </div>
</template>

<script>
import AdminStreams from "../admin/AdminStreams";
import ErrorNotFound from "../common/ErrorNotFound";
export default {
  name: "AdminStreamView",
  components: {ErrorNotFound, AdminStreams},
  computed: {
    permitted () {
      return this.$store.state.loginUser.loggedIn
    }
  },
  mounted () {
    document.title = `${this.$t('admin.title')} ${this.$t('admin.streams')} - ${this.$t('common.title')}`
  }
}
</script>
