<template>
  <video ref="playerRef" class="video-js"></video>
</template>

<script>
import videojs from 'video.js'
import videojsLocaleEn from 'video.js/dist/lang/en.json'
import videojsLocaleDe from 'video.js/dist/lang/de.json'
import 'videojs-youtube/dist/Youtube.min'
import 'videojs-hls-quality-selector'
import 'videojs-contrib-quality-levels'

export default {
  name: "VideoPlayer",
  props: {
    options: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      player: null
    }
  },
  mounted () {
    videojs.addLanguage('en', {
      ...videojsLocaleEn
    })
    videojs.addLanguage('de', {
      ...videojsLocaleDe
    })
    this.player = videojs(this.$refs.playerRef, {
      ...this.options,
      techOrder: ['youtube', 'html5'],
      language: this.$i18n.locale,
      youtube: {
        modestbranding: 1,
        rel: 0
      }
    })
    this.player.qualityLevels()
    this.player.hlsQualitySelector({
      displayCurrentQuality: true
    })
  },
  beforeDestroy () {
    if (this.player) {
      this.player.dispose()
    }
  }
}
</script>

<style>
@import "~video.js/dist/video-js.min.css";
</style>
