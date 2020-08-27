<template>
  <div class="admin">
    <admin v-if="permitted"/>
    <main class="container px-4" v-if="!permitted">
      <error-not-found/>
    </main>
  </div>
</template>

<script>
import Admin from "../admin/Admin";
import ErrorNotFound from "../common/ErrorNotFound";
export default {
  name: "AdminView",
  components: {ErrorNotFound, Admin},
  computed: {
    permitted () {
      return this.$store.state.loginUser.loggedIn
    }
  },
  mounted () {
    document.title = `${this.$t('admin.title')} - ${this.$t('common.title')}`
  }
}
</script>
