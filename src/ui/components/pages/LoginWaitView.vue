<template>
  <main class="container px-4">
    <div class="message" :class="{'is-info': !isError, 'is-danger': isError}">
      <div class="message-body" v-if="isError">
        <b>{{ $t('login.error.title') }}</b><br>
        <span v-html="this.$t('login.error.body')"></span>
      </div>
      <div class="message-body" v-if="!isError">
        <b>{{ $t('login.waiting.title') }}</b><br>
        <span v-html="this.$t('login.waiting.body')"></span>
      </div>
    </div>
  </main>
</template>

<script>
import {getClientId} from "../../utils/clientId";

export default {
  name: "LoginWaitView",
  data () {
    return {
      isError: this.$route.hash === '#failed'
    }
  },
  mounted () {
    if (this.isError) {
      window.setTimeout(() => this.$router.push('/'), 10000)
      return
    }
    window.fetch(`/auth/verify?client=${getClientId()}`, {
      mode: 'cors',
      cache: 'no-cache'
    })
        .then(response => response.json())
        .then(json => {
          window.sessionStorage.setItem('token', json.token)
          window.sessionStorage.setItem('token-ts', `${Math.floor(Date.now() / 1000)}`)
          this.$store.commit('setLoginData', json)
          this.$router.push('/admin')
        })
        .catch((error) => {
          console.error(error)
        })
  }
}
</script>
