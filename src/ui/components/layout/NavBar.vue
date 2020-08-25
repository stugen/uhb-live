<template>
  <nav class="navbar">
    <div class="container">
      <div class="navbar-brand">
        <a role="button" class="navbar-burger burger" data-target="mainNav">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div class="navbar-menu" id="mainNav">
        <div class="navbar-start">
          <a href="https://www.uni-bremen.de" target="_blank" class="navbar-item">Universität Bremen</a>
          <a href="https://stugen.de" target="_blank" class="navbar-item">Stugen</a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavBar"
}
</script>

<style scoped lang="scss">
.navbar {
  background-color: #21467a;
  color: #ffffff;
  position: sticky;
  top: 0;
  box-sizing: border-box;
}
.navbar-item {
  font-size: 1.375rem;
  font-family: "Trebuchet MS", "Lucida Grande", "Lucida Sans Unicode", "Lucida Sans", "Tahoma", sans-serif;
  color: #ffffff;
  padding: 0 1.25em;

  &:hover, &:active, &:focus, &.active {
    background-color: #ba002c;
    color: #ffffff;
  }
}
</style>
