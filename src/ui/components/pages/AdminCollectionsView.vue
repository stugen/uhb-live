<template>
  <div class="admin">
    <admin-collections v-if="permitted"/>
    <main class="container px-4" v-if="!permitted">
      <error-not-found/>
    </main>
  </div>
</template>

<script>
import ErrorNotFound from "../common/ErrorNotFound";
import AdminCollections from "../admin/AdminCollections";
export default {
  name: "AdminView",
  components: {AdminCollections, ErrorNotFound},
  computed: {
    permitted () {
      return this.$store.state.loginUser.loggedIn
    }
  },
  mounted () {
    document.title = `${this.$t('admin.title')} ${this.$t('admin.collections')} - ${this.$t('common.title')}`
  }
}
</script>
