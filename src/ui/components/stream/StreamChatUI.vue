<template>
  <main class="container px-4">
    <h1 v-if="!error">{{metadata.name || name}}</h1>
    <div class="columns" v-if="loaded">
      <div :class="{'column': true, 'is-three-fifths': metadata.chat && showChatIfAvailable}" v-if="showStreamIfAvailable">
        <player :src="metadata.sources"/>
      </div>
      <div class="column" v-if="metadata.chat && showChatIfAvailable" :class="{'is-two-fifths': showStreamIfAvailable}">
        <chat :room="metadata.uuid"/>
      </div>
    </div>
    <div class="links" v-if="loaded">
      <router-link :to="'/v/' + name + '/video'"><font-awesome-icon icon="play-circle"/>{{ $t('stream.showOnlyStream') }}</router-link>
      <router-link :to="'/v/' + name + '/chat'" v-if="metadata.chat"><font-awesome-icon icon="comments"/>{{ $t('stream.showOnlyChat') }}</router-link>
      <router-link :to="'/v/' + name" v-if="metadata.chat">{{ $t('stream.showStreamAndChat') }}</router-link>
    </div>
    <div class="message is-info release-info" v-if="checkInterval !== 0">
      <div class="message-body">
        <b>{{ $t('stream.startsLater', { time: streamStart.time, date: streamStart.date }) }}</b>
      </div>
    </div>
    <div class="level" v-if="!loaded && !error && checkInterval === 0">
      <loading-spinner/>
    </div>
    <error-not-found v-if="error"/>
  </main>
</template>

<script>
import Player from './Player'
import { getMetadata } from './FetchStreamData'
import Chat from '../chat/Chat'
import LoadingSpinner from '../common/LoadingSpinner'
import ErrorNotFound from "../common/ErrorNotFound";
export default {
  name: 'StreamChatUI',
  components: {ErrorNotFound, LoadingSpinner, Chat, Player },
  data () {
    return {
      metadata: {},
      name: this.$route.params.streamname,
      loaded: false,
      error: false,
      checkInterval: 0,
      streamStart: {
        date: '',
        time: ''
      }
    }
  },
  props: {
    showChatIfAvailable: {
      type: Boolean,
      default: false
    },
    showStreamIfAvailable: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    checkTime () {
      const now = Math.floor(Date.now() / 1000)
      const diff = now - this.metadata.startTime
      if (diff > 0) {
        this.loaded = true
        clearInterval(this.checkInterval)
        this.checkInterval = 0
      }
      return diff
    },
    setTitle () {
      document.title = `${this.metadata.name} - ${this.$t('common.title')}`
    }
  },
  created () {
    getMetadata(this.name).then((metadata) => {
      this.metadata = metadata
      this.setTitle()
      if (metadata.startTime !== 0) {
        if (this.checkTime() < 0) {
          const streamStart = new Date(metadata.startTime * 1000)
          this.streamStart.date = streamStart.toLocaleDateString()
          this.streamStart.time = streamStart.toLocaleTimeString()
          this.checkInterval = setInterval(this.checkTime, 2500)
        }
        return
      }
      this.loaded = true
    }).catch((error) => {
      console.error(error)
      this.error = true
    })
  }
}
</script>

<style scoped lang="scss">
h1 {
  font-size: 2rem;
  color: #21467a;
  margin-block-end: 0.5rem;
}
.release-info {
  margin-top: 1.2rem;
}
.links a {
  margin-inline-end: 1rem;

  .fa, .svg-inline--fa {
    margin-inline-end: 0.25rem;
  }
}
</style>
