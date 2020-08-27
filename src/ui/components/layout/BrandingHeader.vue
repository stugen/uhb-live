<template>
  <header class="container">
    <div class="level is-flex">
      <div class="level-left">
        <div class="level-item">
          <a href="https://www.uni-bremen.de" target="_blank">
            <img :src="brandingIcon" :alt="this.$t('common.university')">
          </a>
        </div>
      </div>
      <div class="level-right h-100">
        <div class="level-item links">
          <a href="#" @click.prevent="setLang('en')">EN</a>
          <a href="#" @click.prevent="setLang('de')">DE</a>
          <a :href="`/auth/login?client=${clientId}`" v-if="!this.$store.state.loginUser.loggedIn">Login</a>
          <router-link to="/admin" v-if="this.$store.state.loginUser.loggedIn">Admin</router-link>
          <a href="#" @click.prevent="logout" v-if="this.$store.state.loginUser.loggedIn">{{ $store.state.loginUser.name }} - Logout</a>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import brandingIcon from './branding_icon.svg'
import {setLanguage} from "../../utils/i18n";
import {getClientId} from '../../utils/clientId';

export default {
  name: "BrandingHeader",
  data() {
    return {
      brandingIcon,
      clientId: getClientId()
    }
  },
  methods: {
    setLang (lang) {
      setLanguage(lang)
    },
    logout () {
      window.sessionStorage.clear()
      this.$store.commit('doLogout')
      this.$router.push('/')
    }
  }
}
</script>

<style scoped lang="scss">
.level {
  height: 120px;

  .level-right {
    align-items: start;
    margin-inline-end: 0.5rem;

    .level-item > a {
      margin-block-start: 0.25rem;
      color: #21467a;
      font-size: 0.9rem;
    }
  }

  img {
    height: 50px;
  }

  .level-item > a {
    margin-inline-start: 0.5rem;
  }
}

@media screen and (max-width: 550px) {
  .level-left a {
    width: 50px;
    overflow: hidden;

    & > img {
      height: 50px;
      max-width: none;
    }
  }
}

@media screen and (max-width: 320px) {
  .level {
    display: block !important;
  }
}
</style>
