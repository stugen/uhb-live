<template>
  <div class="app">
    <div class="min-vh-100">
      <branding-header/>
      <sub-header-bar/>
      <nav-bar/>
      <router-view></router-view>
    </div>
    <footer-layout/>
  </div>
</template>

<script>
import BrandingHeader from "./layout/BrandingHeader";
import NavBar from "./layout/NavBar";
import SubHeaderBar from "./layout/SubHeaderBar";
import FooterLayout from "./layout/Footer";
export default {
name: "App",
  components: {FooterLayout, SubHeaderBar, NavBar, BrandingHeader}
}
</script>

<style lang="scss">
@import "~bulma/bulma.sass";

main {
  padding-top: 2rem;
}

.h-100 {
  height: 100%;
}
.w-100 {
  width: 100%;
}
.min-vh-100 {
  min-height: 100vh;
}
.v-hidden {
  visibility: hidden;
}
.button .icon:first-child:last-child {
  margin-left: 0;
  margin-right: 0;
}
</style>
