<template>
  <main class="container px-4">
    <div class="columns">
      <div class="column">
        <router-link to="/admin/videos" class="button is-fullwidth is-primary is-large">{{ this.$t('admin.streams') }}</router-link>
      </div>
      <div class="column">
        <router-link to="/admin/collections" class="button is-fullwidth is-primary is-large">{{ this.$t('admin.collections') }}</router-link>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: "AdminOverview"
}
</script>
