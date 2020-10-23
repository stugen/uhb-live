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

h1.is-h1 {
  font-size: 2rem;
  color: #21467a;
  margin-block-end: 0.5rem;
}

body.noscript {
  background-color: #E53935;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  color: #fff;

  .media-left {
    margin-right: 2.5rem;
  }

  svg {
    height: 9rem;
    overflow: hidden;
  }

  .content {
    h1, p, a {
      color: #ffffff;
    }

    a:hover, a:focus, a:active {
      text-decoration: underline;
    }
  }
}
</style>
