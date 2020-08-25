<template>
  <div class="navbar">
    <div class="container">
      <div class="navbar-brand">
        <router-link to="/" class="navbar-item">Videos/Live-Streams</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
name: "SubHeaderBar"
}
</script>

<style scoped lang="scss">
.navbar {
  background-color: #E8ECF1;
}
.navbar-item {
  color: #21467a;
  font-size: 1.375rem;
  margin-inline-start: 0.5rem;

  &:active, &:hover, &:focus {
    color: #ba002c;
    text-decoration: underline;
  }
}
</style>
